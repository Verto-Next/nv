// app/api/translations/route.ts
import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

// Fallback translations in case database fails
const fallbackTranslations = {
  en: {
    common: {
      // Copy the English translations from resources above
      navbar: {
        home: 'Home',
        dashboard: 'Dashboard',
        users: 'Users',
        testDb: 'Test DB',
        apiTest: 'API Test',
        contact: 'Contact',
        charts: 'Charts',
        apiLogs: 'API Logs',
        signIn: 'Sign In',
        signOut: 'Sign Out'
      },
      languages: {
        turkish: 'Turkish',
        english: 'English'
      }
    },
    translation: {
      // Same as common
      navbar: {
        home: 'Home',
        // etc.
      }
    }
  },
  tr: {
    common: {
      // Copy the Turkish translations from resources above
      navbar: {
        home: 'Ana Sayfa',
        // etc.
      }
    },
    translation: {
      // Same as common
      navbar: {
        home: 'Ana Sayfa',
        // etc.
      }
    }
  }
};

export async function GET(request: Request) {
  // Get locale and namespace from query parameters
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'tr';
  const namespace = searchParams.get('namespace') || 'common';
  
  // Validate locale and namespace
  if (!['en', 'tr'].includes(locale) || !['common', 'translation'].includes(namespace)) {
    // Return fallback for invalid parameters
    const fallbackData = fallbackTranslations[locale as 'en' | 'tr']?.[namespace as 'common' | 'translation'] 
      || fallbackTranslations['tr']['common'];
    
    return NextResponse.json(fallbackData);
  }
  
  try {
    const connection = await getConnection();
    
    // Fetch translations for the specified locale and namespace
    const [rows] = await connection.execute(
      'SELECT key_path, value FROM translations WHERE locale = ? AND namespace = ?',
      [locale, namespace]
    );
    
    await connection.end();
    
    // Check if we have any translations
    if (!(rows as any[]).length) {
      // Return fallback if no translations found
      const fallbackData = fallbackTranslations[locale as 'en' | 'tr'][namespace as 'common' | 'translation'];
      return NextResponse.json(fallbackData);
    }
    
    // Transform flat array into nested structure
    const translations = (rows as any[]).reduce((result, item) => {
      // Split key_path (e.g., 'navbar.home') into parts
      const parts = item.key_path.split('.');
      let current = result;
      
      // Build nested object structure
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) {
          current[parts[i]] = {};
        }
        current = current[parts[i]];
      }
      
      // Set the value at the final key
      current[parts[parts.length - 1]] = item.value;
      
      return result;
    }, {});
    
    return NextResponse.json(translations);
  } catch (error: any) {
    console.error('Error fetching translations:', error);
    
    // Return fallback translations on error
    const fallbackData = fallbackTranslations[locale as 'en' | 'tr'][namespace as 'common' | 'translation'];
    return NextResponse.json(fallbackData);
  }
}