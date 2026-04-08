import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Category from '../models/Category.js';

export const initAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Admin user created');
    }

    const categories = [
      { name: 'YMCA', slug: 'ymca', description: 'YMCA Projects' },
      { name: 'Gujarat Tourism', slug: 'gujarat-tourism', description: 'Gujarat Tourism Projects' },
      { name: 'Arvind Smart City', slug: 'arvind-smart-city', description: 'Arvind Smart City Projects' },
      { name: 'Adani Group', slug: 'adani-group', description: 'Adani Group Projects' },
      { name: 'Torrent Power', slug: 'torrent-power', description: 'Torrent Power Projects' },
      { name: 'Zydus Cadila', slug: 'zydus-cadila', description: 'Zydus Cadila Projects' },
      { name: 'Sun Pharma', slug: 'sun-pharma', description: 'Sun Pharma Projects' },
      { name: 'Other Clients', slug: 'other-clients', description: 'Other Client Projects' }
    ];

    for (const cat of categories) {
      await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
    }
    console.log('✅ Categories initialized');
  } catch (error) {
    console.error('Init error:', error);
  }
};
