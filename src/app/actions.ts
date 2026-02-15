'use server'

import { supabase } from "@/lib/supabase";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  github: string;
  specialization: string;
}) {
  // Debug: Check if key is loaded
  const keyStatus = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? `PRESENT (${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length} chars)` : 'MISSING';
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', keyStatus);

  const { data, error } = await supabase
    .from('contact_form')
    .insert([
      {
        name: formData.name,
        email: formData.email,
        github_handle: formData.github,
        specialization: formData.specialization,
        message: `New recruitment application from ${formData.name} (${formData.email}). GitHub: ${formData.github}. Specialization: ${formData.specialization}`
      },
    ]);

  if (error) {
    console.error('Error inserting data:', error);
    return { success: false, error: error.message };
  }

  return { success: true, data };
}
