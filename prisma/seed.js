import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting database seed...');

	// Create users
	console.log('Creating users...');
	const hashedPassword = await bcrypt.hash('password123', 10);

	const alice = await prisma.user.upsert({
		where: { username: 'alice' },
		update: {},
		create: {
			username: 'alice',
			password: hashedPassword
		}
	});

	const bob = await prisma.user.upsert({
		where: { username: 'bob' },
		update: {},
		create: {
			username: 'bob',
			password: hashedPassword
		}
	});

	const charlie = await prisma.user.upsert({
		where: { username: 'charlie' },
		update: {},
		create: {
			username: 'charlie',
			password: hashedPassword
		}
	});

	console.log('Created users: alice, bob, charlie (password: password123)');

	// Create labels
	console.log('Creating labels...');
	const bugLabel = await prisma.label.upsert({
		where: { name: 'Bug' },
		update: {},
		create: {
			name: 'Bug',
			color: '#EF4444'
		}
	});

	const featureLabel = await prisma.label.upsert({
		where: { name: 'Feature' },
		update: {},
		create: {
			name: 'Feature',
			color: '#10B981'
		}
	});

	const urgentLabel = await prisma.label.upsert({
		where: { name: 'Urgent' },
		update: {},
		create: {
			name: 'Urgent',
			color: '#F59E0B'
		}
	});

	console.log('Created labels: Bug, Feature, Urgent');

	// Create a sample project
	console.log('Creating sample project...');
	const project = await prisma.project.create({
		data: {
			name: 'Website Redesign',
			description: 'Redesign the company website with modern UI/UX',
			startDate: new Date('2025-01-01'),
			endDate: new Date('2025-06-30'),
			ownerId: alice.id,
			members: {
				create: [
					{
						userId: bob.id,
						role: 'developer'
					},
					{
						userId: charlie.id,
						role: 'qa'
					}
				]
			}
		}
	});

	console.log('Created project: Website Redesign');

	// Create sample tasks
	console.log('Creating sample tasks...');
	await prisma.task.create({
		data: {
			projectId: project.id,
			title: 'Design new homepage',
			description: 'Create mockups for the new homepage layout',
			status: 'In Progress',
			priority: 'High',
			assigneeId: bob.id,
			dueDate: new Date('2025-02-15'),
			taskLabels: {
				create: [
					{ labelId: featureLabel.id }
				]
			}
		}
	});

	await prisma.task.create({
		data: {
			projectId: project.id,
			title: 'Fix mobile navigation',
			description: 'Navigation menu is not working properly on mobile devices',
			status: 'Todo',
			priority: 'High',
			assigneeId: bob.id,
			taskLabels: {
				create: [
					{ labelId: bugLabel.id },
					{ labelId: urgentLabel.id }
				]
			}
		}
	});

	await prisma.task.create({
		data: {
			projectId: project.id,
			title: 'Write test cases',
			description: 'Create comprehensive test cases for all new features',
			status: 'Todo',
			priority: 'Medium',
			assigneeId: charlie.id,
			dueDate: new Date('2025-03-01')
		}
	});

	await prisma.task.create({
		data: {
			projectId: project.id,
			title: 'Set up CI/CD pipeline',
			description: 'Configure automated testing and deployment',
			status: 'Done',
			priority: 'Medium',
			assigneeId: alice.id
		}
	});

	console.log('Created 4 sample tasks');

	console.log('✅ Database seed completed successfully!');
	console.log('\nYou can now login with:');
	console.log('  Username: alice, bob, or charlie');
	console.log('  Password: password123');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
