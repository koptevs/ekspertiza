-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `cache` (
	`key` varchar(255) NOT NULL,
	`value` mediumtext NOT NULL,
	`expiration` int NOT NULL,
	CONSTRAINT `cache_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `cache_locks` (
	`key` varchar(255) NOT NULL,
	`owner` varchar(255) NOT NULL,
	`expiration` int NOT NULL,
	CONSTRAINT `cache_locks_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `failed_jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`uuid` varchar(255) NOT NULL,
	`connection` text NOT NULL,
	`queue` text NOT NULL,
	`payload` longtext NOT NULL,
	`exception` longtext NOT NULL,
	`failed_at` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT `failed_jobs_id` PRIMARY KEY(`id`),
	CONSTRAINT `failed_jobs_uuid_unique` UNIQUE(`uuid`)
);
--> statement-breakpoint
CREATE TABLE `inspections` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`protocol_number` varchar(32) NOT NULL,
	`lift_id` bigint unsigned NOT NULL,
	`inspection_type` enum('Pirmreizējā','Kārtējā','Ārpuskārtas','Atkārtotā'),
	`inspection_next_type` enum('Pirmreizējā','Kārtējā','Ārpuskārtas','Atkārtotā'),
	`expert` int unsigned,
	`lift_manager` int unsigned,
	`date_start` date,
	`date_end` date,
	`date_next` date,
	`date_next_normal` date,
	`label` varchar(32),
	`bir_number` varchar(32),
	`inspection_result` int unsigned,
	`participants` varchar(255),
	`non_compliances_0` text,
	`non_compliances_1` text,
	`non_compliances_2` text,
	`non_compliances_3` text,
	`extra_check_reason` text,
	`not_checked_forced` text,
	`notes` text,
	`notes_for_protokol` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `inspections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `job_batches` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`total_jobs` int NOT NULL,
	`pending_jobs` int NOT NULL,
	`failed_jobs` int NOT NULL,
	`failed_job_ids` longtext NOT NULL,
	`options` mediumtext,
	`cancelled_at` int,
	`created_at` int NOT NULL,
	`finished_at` int,
	CONSTRAINT `job_batches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `jobs` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`queue` varchar(255) NOT NULL,
	`payload` longtext NOT NULL,
	`attempts` tinyint unsigned NOT NULL,
	`reserved_at` int unsigned,
	`available_at` int unsigned NOT NULL,
	`created_at` int unsigned NOT NULL,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lift_managers` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`reg_number` varchar(64) NOT NULL,
	`address` varchar(128) NOT NULL,
	`contract_number` varchar(128),
	`contract_date` varchar(128),
	`contact_person` varchar(128),
	`contact_person_position` varchar(128),
	`contact_person_phone` varchar(64),
	`contact_person_phone_bill` varchar(64),
	`email_for_docs` varchar(64),
	`bank_name` varchar(64),
	`bank_code` varchar(64),
	`bank_account` varchar(64),
	`bill_pay_days` varchar(64),
	`protocol_with_electric_measurments` tinyint(1) NOT NULL DEFAULT 0,
	`notes` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lift_managers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lifts` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`lift_manager_id` bigint unsigned,
	`reg_number` varchar(32) NOT NULL,
	`bir_url` varchar(256),
	`type` enum('elektriskais','hidrauliskais') NOT NULL,
	`category` enum('1','2','3','CE') NOT NULL,
	`factory_number` varchar(32) NOT NULL,
	`model` varchar(64),
	`speed` decimal(8,2),
	`load` smallint unsigned NOT NULL,
	`manufacturer` varchar(128),
	`installer` varchar(128),
	`installation_year` smallint unsigned NOT NULL,
	`floors_serviced` tinyint unsigned,
	`address_country` varchar(64) NOT NULL,
	`address_city` varchar(64) NOT NULL,
	`address` varchar(256) NOT NULL,
	`address_postal_code` varchar(8) NOT NULL,
	`google_coordinates` varchar(128),
	`building_series` varchar(16),
	`notes` text,
	`inspection_status` enum('X','0','1','2','3') NOT NULL DEFAULT 'X',
	`entry_code` varchar(128),
	`next_inspection_date` date,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `lifts_id` PRIMARY KEY(`id`),
	CONSTRAINT `lifts_reg_number_unique` UNIQUE(`reg_number`)
);
--> statement-breakpoint
CREATE TABLE `mechanics` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`personal_code` varchar(64),
	`company` varchar(64) NOT NULL,
	`phone` varchar(64),
	`email` varchar(64),
	`notes` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `mechanics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `migrations` (
	`id` int unsigned AUTO_INCREMENT NOT NULL,
	`migration` varchar(255) NOT NULL,
	`batch` int NOT NULL,
	CONSTRAINT `migrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `model_has_permissions` (
	`permission_id` bigint unsigned NOT NULL,
	`model_type` varchar(255) NOT NULL,
	`model_id` bigint unsigned NOT NULL,
	CONSTRAINT `model_has_permissions_permission_id_model_id_model_type` PRIMARY KEY(`permission_id`,`model_id`,`model_type`)
);
--> statement-breakpoint
CREATE TABLE `model_has_roles` (
	`role_id` bigint unsigned NOT NULL,
	`model_type` varchar(255) NOT NULL,
	`model_id` bigint unsigned NOT NULL,
	CONSTRAINT `model_has_roles_role_id_model_id_model_type` PRIMARY KEY(`role_id`,`model_id`,`model_type`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`email` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp,
	CONSTRAINT `password_reset_tokens_email` PRIMARY KEY(`email`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`guard_name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_name_guard_name_unique` UNIQUE(`name`,`guard_name`)
);
--> statement-breakpoint
CREATE TABLE `role_has_permissions` (
	`permission_id` bigint unsigned NOT NULL,
	`role_id` bigint unsigned NOT NULL,
	CONSTRAINT `role_has_permissions_permission_id_role_id` PRIMARY KEY(`permission_id`,`role_id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`guard_name` varchar(255) NOT NULL,
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_guard_name_unique` UNIQUE(`name`,`guard_name`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` varchar(255) NOT NULL,
	`user_id` bigint unsigned,
	`ip_address` varchar(45),
	`user_agent` text,
	`payload` longtext NOT NULL,
	`last_activity` int NOT NULL,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`expert_number` varchar(255) NOT NULL DEFAULT '00',
	`email` varchar(255) NOT NULL,
	`email_verified_at` timestamp,
	`password` varchar(255) NOT NULL,
	`remember_token` varchar(100),
	`created_at` timestamp,
	`updated_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `inspections` ADD CONSTRAINT `inspections_lift_id_foreign` FOREIGN KEY (`lift_id`) REFERENCES `lifts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `model_has_permissions` ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `model_has_roles` ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_has_permissions` ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `inspections_lift_id_index` ON `inspections` (`lift_id`);--> statement-breakpoint
CREATE INDEX `jobs_queue_index` ON `jobs` (`queue`);--> statement-breakpoint
CREATE INDEX `model_has_permissions_model_id_model_type_index` ON `model_has_permissions` (`model_id`,`model_type`);--> statement-breakpoint
CREATE INDEX `model_has_roles_model_id_model_type_index` ON `model_has_roles` (`model_id`,`model_type`);--> statement-breakpoint
CREATE INDEX `sessions_user_id_index` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `sessions_last_activity_index` ON `sessions` (`last_activity`);
*/