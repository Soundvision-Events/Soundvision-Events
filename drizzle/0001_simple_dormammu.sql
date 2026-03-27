CREATE TABLE `contact_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`eventType` varchar(100),
	`eventDate` varchar(50),
	`location` varchar(255),
	`packageType` varchar(50),
	`guestCount` varchar(50),
	`message` text,
	`status` enum('new','in_progress','confirmed','completed','cancelled') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`fileKey` varchar(512) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`mimeType` varchar(128),
	`size` bigint,
	`category` varchar(50),
	`caption` text,
	`uploadedBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
