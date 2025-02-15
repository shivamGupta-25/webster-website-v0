// src/app/api/register/route.js
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

async function getAuthToken() {
    try {
        const client = new JWT({
            email: GOOGLE_CLIENT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: SCOPES,
        });
        await client.authorize();
        return client;
    } catch (error) {
        console.error('Auth error:', error);
        throw new Error('Failed to authenticate with Google');
    }
}

async function getExistingRegistrations(data) {
    try {
        const client = await getAuthToken();
        const sheets = google.sheets({ version: 'v4', auth: client });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'Sheet1!A:K',
        });

        const rows = response.data.values || [];
        
        // Check for various duplicate conditions
        const isDuplicate = rows.some(row => {
            const emailMatch = row[1] === data.email;
            const phoneMatch = row[6] === data.phone;
            const eventCategoryMatch = row[7] === data.eventCategory;
            const eventMatch = row[8] === data.event;
            
            // If email or phone matches and event category and event match
            if ((emailMatch || phoneMatch) && eventCategoryMatch && eventMatch) {
                return true;
            }
            return false;
        });

        if (isDuplicate) {
            if (rows.some(row => row[1] === data.email)) {
                return { isDuplicate: true, message: 'You have already registered for this event with this email' };
            }
            if (rows.some(row => row[6] === data.phone)) {
                return { isDuplicate: true, message: 'This phone number is already registered for this event' };
            }
            return { isDuplicate: true, message: 'You have already registered for this event' };
        }

        return { isDuplicate: false };
    } catch (error) {
        console.error('Error checking registrations:', error);
        throw new Error('Failed to check existing registrations');
    }
}

export async function POST(req) {
    try {
        if (!GOOGLE_PRIVATE_KEY || !GOOGLE_CLIENT_EMAIL || !GOOGLE_SHEET_ID) {
            throw new Error('Missing required Google Sheets credentials');
        }

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
            data.email,
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
            spreadsheetId: GOOGLE_SHEET_ID,
            range: 'Sheet1!A:K',
            valueInputOption: 'RAW',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [rowData],
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process registration' },
            { status: 500 }
        );
    }
}