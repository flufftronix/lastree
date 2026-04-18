#!/usr/bin/env node

import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'process';
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({ input, output });

const SOCIAL_PLATFORMS = [
  { name: 'GitHub', icon: 'github' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'Twitch', icon: 'twitch' },
  { name: 'WhatsApp', icon: 'whatsapp' },
  { name: 'TikTok', icon: 'tiktok' },
  { name: 'Facebook', icon: 'facebook' },
];

console.log('\n🚀 Welcome to Linkytree Setup Assistant\n');
console.log("This assistant will guide you through setting up your site's basic information.\n");

try {
  const name = await rl.question('📝 What is your full name? ');
  if (!name.trim()) {
    console.error('❌ Name is required');
    process.exit(1);
  }

  const handle = await rl.question('🏷️  What is your handle/username (e.g. @gndx)? ');
  if (!handle.trim()) {
    console.error('❌ Handle is required');
    process.exit(1);
  }

  const bio = await rl.question('✍️  Write your bio: ');
  if (!bio.trim()) {
    console.error('❌ Bio is required');
    process.exit(1);
  }

  console.log("\n🔗 Now let's configure your social links");
  console.log("Press Enter to skip any social platform you don't want to add.\n");

  const socialLinks = [];

  for (const platform of SOCIAL_PLATFORMS) {
    const url = await rl.question(`📱 ${platform.name} URL (or press Enter to skip): `);

    if (url.trim()) {
      socialLinks.push({
        href: url.trim(),
        ariaLabel: platform.name,
        icon: platform.icon,
      });
      console.log(`✅ ${platform.name} added`);
    } else {
      console.log(`⏭️  ${platform.name} skipped`);
    }
  }

  rl.close();

  console.log('\n⏳ Updating site.ts file...\n');

  const siteFilePath = join(__dirname, '..', 'src', 'data', 'site.ts');
  let fileContent = await readFile(siteFilePath, 'utf-8');

  const nameFormatted = name.trim();
  const handleFormatted = handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`;
  const bioFormatted = bio.trim();

  fileContent = fileContent.replace(
    /profile:\s*{[^}]*}/s,
    `profile: {
    avatarSrc: 'https://s3.us-east-1.amazonaws.com/gndx.dev/oscar-barajas-tavares-gndx.jpg',
    name: '${nameFormatted}',
    handle: '${handleFormatted}',
    bio: '${bioFormatted}',
  }`,
  );

  if (socialLinks.length > 0) {
    const socialLinksCode = socialLinks
      .map(
        (link) =>
          `    {
      href: '${link.href}',
      ariaLabel: '${link.ariaLabel}',
      icon: '${link.icon}',
    }`,
      )
      .join(',\n');

    fileContent = fileContent.replace(
      /socialLinks:\s*\[[^\]]*\]\s*satisfies\s+SiteSocialLink\[\],?/s,
      `socialLinks: [
${socialLinksCode},
  ] satisfies SiteSocialLink[],`,
    );
  }

  await writeFile(siteFilePath, fileContent, 'utf-8');

  console.log('✅ site.ts file updated successfully!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 CONFIGURATION SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`👤 Name: ${nameFormatted}`);
  console.log(`🏷️  Handle: ${handleFormatted}`);
  console.log(`✍️  Bio: ${bioFormatted}`);
  console.log(`🔗 Social links: ${socialLinks.length} added`);
  socialLinks.forEach((link) => {
    console.log(`   • ${link.ariaLabel}: ${link.href}`);
  });
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('🎉 Setup completed!\n');
  console.log('📝 NEXT STEPS:\n');
  console.log('1️⃣  Start the development server:');
  console.log('   npm run dev\n');
  console.log('2️⃣  Open your browser at: http://localhost:4321\n');
  console.log('3️⃣  Edit src/data/site.ts to customize:');
  console.log('   • SEO (title, description, og:image)');
  console.log('   • Avatar (avatarSrc)');
  console.log('   • Featured Link (featured link)');
  console.log('   • Link Cards (link cards)\n');
  console.log('💡 Tip: The server will reload automatically with each change.\n');
} catch (error) {
  console.error('\n❌ Error:', error.message);
  rl.close();
  process.exit(1);
}
