// src/app/api/register/route.js
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Properly format the private key by replacing escaped newlines
function getFormattedKey() {
    const key = process.env.GOOGLE_PRIVATE_KEY;
    if (!key) {
        throw new Error('GOOGLE_PRIVATE_KEY is not defined in environment variables');
    }
    // Handle both formats: already formatted or escaped newlines
    return key.includes('\\n') ? key.replace(/\\n/g, '\n') : key;
}

// Verify all required environment variables are present
function validateEnvironmentVars() {
    const required = {
        GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
        GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
        GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID
    };

    const missing = Object.entries(required)
        .filter(([_, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

async function getAuthToken() {
    try {
        validateEnvironmentVars();
        
        const client = new JWT({
            email: process.env.GOOGLE_CLIENT_EMAIL,
            key: getFormattedKey(),
            scopes: SCOPES,
        });

        // Test the authentication explicitly
        const auth = await client.authorize();
        if (!auth.access_token) {
            throw new Error('Failed to obtain access token');
        }

        return client;
    } catch (error) {
        console.error('Authentication Error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

async function getExistingRegistrations(data) {
    try {
        const client = await getAuthToken();
        const sheets = google.sheets({ version: 'v4', auth: client });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A:K',
        }).catch(error => {
            console.error('Sheets API Error:', {
                error: error.message,
                code: error.code,
                status: error.status
            });
            throw new Error('Failed to access Google Sheet');
        });

        if (!response || !response.data) {
            throw new Error('No response from Google Sheets API');
        }

        const rows = response.data.values || [];
        
        // Check for various duplicate conditions
        const duplicateCheck = rows.find(row => {
            const emailMatch = row[1]?.toLowerCase() === data.email?.toLowerCase();
            const phoneMatch = row[6] === data.phone;
            const eventCategoryMatch = row[7] === data.eventCategory;
            const eventMatch = row[8] === data.event;
            
            return (emailMatch || phoneMatch) && eventCategoryMatch && eventMatch;
        });

        if (duplicateCheck) {
            const emailMatch = rows.some(row => row[1]?.toLowerCase() === data.email?.toLowerCase());
            if (emailMatch) {
                return { isDuplicate: true, message: 'You have already registered for this event with this email' };
            }
            if (rows.some(row => row[6] === data.phone)) {
                return { isDuplicate: true, message: 'This phone number is already registered for this event' };
            }
            return { isDuplicate: true, message: 'You have already registered for this event' };
        }

        return { isDuplicate: false };
    } catch (error) {
        console.error('Registration Check Error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export async function POST(req) {
    try {
        validateEnvironmentVars();

        const data = await req.json();
        
        // Check for duplicate registration
        const duplicateCheck = await getExistingRegistrations(data);
        if (duplicateCheck.isDuplicate) {
            return NextResponse.json(
                { error: duplicateCheck.message },
                { status: 400 }
            );
        }

        const client = await getAuthToken();
        const sheets = google.sheets({ version: 'v4', auth: client });

        // Format data for sheet
        const rowData = [
            new Date().toISOString(),
            data.email?.toLowerCase(),
            data.name,
            data.rollNo,
            data.course,
            data.college === 'Other' ? data.otherCollege : data.college,
            data.phone,
            data.eventCategory,
            data.event,
            data.year,
            data.query || ''
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A:K',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [rowData],
            },
        }).catch(error => {
            console.error('Sheet Append Error:', {
                error: error.message,
                code: error.code,
                status: error.status
            });
            throw new Error('Failed to save registration data');
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration Error:', {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            data: error.response?.data
        });
        
        return NextResponse.json(
            { error: error.message || 'Failed to process registration' },
            { status: 500 }
        );
    }
}