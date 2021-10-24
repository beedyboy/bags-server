 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";
 
CREATE TABLE `accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `firstname` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `address` text,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `home` varchar(30) DEFAULT NULL,
  `roles` json DEFAULT NULL,
  `hasRoles` tinyint(1) DEFAULT '0',
  `token` text,
  `status` enum('Active','Pending','Deleted','Banned') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

CREATE TABLE `audits` (
  `id` int(10) UNSIGNED NOT NULL,
  `recon_id` int(10) UNSIGNED DEFAULT NULL,
  `value_date` varchar(30) NOT NULL,
  `remarks` text,
  `credit_amount` float(8,2) NOT NULL,
  `amount_used` float(8,2) DEFAULT NULL,
  `balance` float(8,2) DEFAULT NULL,
  `customer` varchar(50) DEFAULT NULL,
  `approved_one` tinyint(1) DEFAULT '0',
  `approved_two` tinyint(1) DEFAULT '0',
  `approval_one` int(10) UNSIGNED DEFAULT NULL,
  `approval_two` int(10) UNSIGNED DEFAULT NULL,
  `reference` varchar(30) DEFAULT NULL,
  `cancellation_number` varchar(30) DEFAULT NULL,
  `cancellation_date` varchar(30) DEFAULT NULL,
  `reconcile_date_one` varchar(30) DEFAULT NULL,
  `reconcile_date_two` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

CREATE TABLE `brands` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text,
  `status` enum('Active','Pending','Deleted') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `fullname` varchar(60) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Read','UnRead','Deleted') DEFAULT 'UnRead',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20210516132020_init.js', 1, '2021-10-23 16:50:03'),
(2, '20210706111540_final.js', 1, '2021-10-23 16:50:03'),
(3, '20210817155645_audits.js', 1, '2021-10-23 16:50:03');
 

CREATE TABLE `knex_migrations_lock` (
  `index` int(10) UNSIGNED NOT NULL,
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
INSERT INTO `knex_migrations_lock` (`index`, `is_locked`) VALUES
(1, 0);
 

CREATE TABLE `products` (
  `id` int(10) UNSIGNED NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `sub_id` int(10) UNSIGNED DEFAULT NULL,
  `brand_id` int(10) UNSIGNED DEFAULT NULL,
  `product_name` varchar(50) DEFAULT NULL,
  `description` text,
  `status` enum('Active','Pending','Deleted') DEFAULT 'Active',
  `images` json DEFAULT NULL,
  `has_name` tinyint(1) DEFAULT '0',
  `branded` tinyint(1) DEFAULT '0',
  `best` tinyint(1) DEFAULT '0',
  `arrival` tinyint(1) DEFAULT '0',
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 

CREATE TABLE `reconcillations` (
  `id` int(10) UNSIGNED NOT NULL,
  `value_date` varchar(30) NOT NULL,
  `remarks` text,
  `credit_amount` float(8,2) NOT NULL,
  `amount_used` float(8,2) DEFAULT NULL,
  `balance` float(8,2) DEFAULT NULL,
  `customer` varchar(50) DEFAULT NULL,
  `approved_one` tinyint(1) DEFAULT '0',
  `approved_two` tinyint(1) DEFAULT '0',
  `approval_one` int(10) UNSIGNED DEFAULT NULL,
  `approval_two` int(10) UNSIGNED DEFAULT NULL,
  `reference` varchar(30) DEFAULT NULL,
  `cancellation_number` varchar(30) DEFAULT NULL,
  `cancellation_date` varchar(30) DEFAULT NULL,
  `reconcile_date_one` varchar(30) DEFAULT NULL,
  `reconcile_date_two` varchar(30) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DELIMITER $$
CREATE TRIGGER `audit_trail` BEFORE UPDATE ON `reconcillations` FOR EACH ROW INSERT INTO audits VALUES (old.id, 
      old.value_date,
      old.remarks,
      old.credit_amount,
  old.amount_used,
  old.balance,
  old.customer,
  old.approved_one,
  old.approved_two,
  old.approval_one,	 
  old.approval_two,
  old.reference,
  old.cancellation_number,
  old.reconcile_date_one,
  old.reconcile_date_two,
  old.cancellation_date,
  old.created_at,     CURRENT_TIMESTAMP)
$$
DELIMITER ;
 
CREATE TABLE `subcategories` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `slug` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text,
  `status` enum('Active','Pending','Deleted') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
CREATE TABLE `subscribers` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` enum('Active','Pending','Deleted') DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `accounts_email_unique` (`email`);
 
ALTER TABLE `audits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `audits_approval_one_foreign` (`approval_one`),
  ADD KEY `audits_approval_two_foreign` (`approval_two`),
  ADD KEY `audits_recon_id_foreign` (`recon_id`);
 
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_name_unique` (`name`);
 
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);
 
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);
 
ALTER TABLE `knex_migrations_lock`
  ADD PRIMARY KEY (`index`);
 
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_sub_id_foreign` (`sub_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`);
 
ALTER TABLE `reconcillations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reconcillations_approval_one_foreign` (`approval_one`),
  ADD KEY `reconcillations_approval_two_foreign` (`approval_two`);
 
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);
 
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subscribers_email_unique` (`email`);
 
ALTER TABLE `accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `audits`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `brands`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
 
ALTER TABLE `knex_migrations_lock`
  MODIFY `index` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
 
ALTER TABLE `products`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `reconcillations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `subcategories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
 
ALTER TABLE `subscribers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

 
ALTER TABLE `audits`
  ADD CONSTRAINT `audits_approval_one_foreign` FOREIGN KEY (`approval_one`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `audits_approval_two_foreign` FOREIGN KEY (`approval_two`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `audits_recon_id_foreign` FOREIGN KEY (`recon_id`) REFERENCES `reconcillations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

 
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_sub_id_foreign` FOREIGN KEY (`sub_id`) REFERENCES `subcategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

 
ALTER TABLE `reconcillations`
  ADD CONSTRAINT `reconcillations_approval_one_foreign` FOREIGN KEY (`approval_one`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reconcillations_approval_two_foreign` FOREIGN KEY (`approval_two`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
