'use server';

import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const SAVED_TESTIMONIALS_FILE = path.join(process.cwd(), 'data/saved-testimonials.json');

let liveTestimonials: any[] = [];

// Load saved testimonials
export async function getLiveTestimonials(initialTestimonials: any[]) {
  try {
    const data = await readFile(SAVED_TESTIMONIALS_FILE, 'utf8');
    const saved = JSON.parse(data);
    liveTestimonials = [...initialTestimonials, ...saved];
  } catch {
    liveTestimonials = [...initialTestimonials];
  }
  return liveTestimonials;
}

// Add and save approved testimonial
export async function addApprovedTestimonial(newTestimonial: any) {
  const current = await getLiveTestimonials([]);
  const testimonial = {
    quote: newTestimonial.comment || newTestimonial.quote,
    name: newTestimonial.name,
    role: newTestimonial.role,
    image: "/images/testimonials/peter-k.jpg",
    date: new Date().toISOString()
  };

  current.unshift(testimonial);

  await writeFile(SAVED_TESTIMONIALS_FILE, JSON.stringify(current, null, 2));

  return current;
}