-- phpMyAdmin SQL Dump
-- version 4.5.3.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 02, 2016 at 10:53 AM
-- Server version: 5.7.10
-- PHP Version: 5.5.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`ampachts`@`%` PROCEDURE `adminLogin` (IN `email` VARCHAR(255), IN `pass` VARCHAR(255))  select user_id, 
	user_name, 
	user_password, 
	user_email
from users
where user_email = email and user_password = pass$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `counts` ()  select (
	select count(*)
	from erotimatologia ) as count1,
	(
	select count(*)
	from questions ) as count2,
	(
	select count(*)
	from users ) as count3$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteAnswer` (IN `id` INT)  delete from answers
where ans_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteCategory` (IN `id` INT)  delete from categories
where cat_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteCatRes` (IN `id` INT)  delete from category_results
where cr_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteErotimatologio` (IN `id` INT)  delete from erotimatologia
where er_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteErRes` (IN `id` INT)  delete from erotimatologio_results
where err_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteQuestion` (IN `id` INT)  delete from questions
where q_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `deleteUser` (IN `id` INT)  delete from users
where user_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllAnswers` (IN `id` INT)  select ans_id,ans_q,ans_text,ans_weight,ans_created,q_question
from answers
inner join questions on q_id = ans_q
where ans_q = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllCategories` (IN `id` INT)  select cat_id,cat_er,cat_title,cat_description,cat_created,cat_image,er_title
from categories
inner join erotimatologia on er_id = cat_er
where cat_er = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllCatRes` (IN `id` INT)  select cr_id,cr_cat,cr_weightFrom,cr_weightTo,cr_weightTo,cr_text,cr_created,cr_image,cat_title
from category_results
inner join categories on cat_id = cr_cat
where cr_cat = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllErotimatologia` ()  select er_id,er_active,er_title,er_description,er_created,er_image
from erotimatologia
where er_type = 0$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllErRes` (IN `id` INT)  select err_id,err_er,err_weightFrom,err_weightTo,err_text,err_created,err_image,er_title
from erotimatologio_results
inner join erotimatologia on er_id = err_er
where err_er = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllQuestions` (IN `id` INT)  select q_id,q_cat,q_question,q_order,q_type,q_created,cat_title
from questions
inner join categories on cat_id = q_cat
where q_cat = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAllUsers` ()  select user_id,user_email,user_name,user_created
from users$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getAnswer` (IN `id` INT)  select *
from answers
where ans_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getCategory` (IN `id` INT)  select *
from categories
where cat_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getCatRes` (IN `id` INT)  select *
from category_results
where cr_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getData1st` (IN `id` INT)  select er_id,er_title,er_description,cat_id,cat_title,cat_description,cat_image
from erotimatologia
inner join categories on cat_er = er_id
where er_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getData2nd` (IN `id` INT)  select q_id,q_question,q_helptext,q_type
from questions
where q_cat = id
order by q_order asc$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getData3rd` (IN `id` INT)  select ans_id,ans_text,ans_weight
from answers
where ans_q = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getErotimatologioByID` (IN `id` INT)  select *
from erotimatologia
where er_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getErRes` (IN `id` INT)  select *
from erotimatologio_results
where err_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getQuestion` (IN `id` INT)  select *
from questions
where q_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getResultsByCat` (IN `points` INT, IN `category` INT)  select cr_text,cr_image,cat_title
from category_results
inner join categories on cr_cat = cat_id
where cr_weightFrom <= points and cr_weightTo >= points and cr_cat = category$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getResultsByEr` (IN `points` INT, IN `erot` INT)  select err_text,err_image,er_title
from erotimatologio_results
inner join erotimatologia on err_er = er_id
where err_weightFrom <= points and err_weightTo >= points and err_er = erot$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `getUser` (IN `id` INT)  select *
from users
where user_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertAnswer` (IN `quest` TEXT, IN `anstxt` TEXT, IN `weight` INT)  INSERT INTO answers(
	ans_q,
	ans_text,
	ans_weight,
	ans_created
)
VALUES (
	quest,
	anstxt,
	weight,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertCategory` (IN `erot` INT, IN `title` VARCHAR(255), IN `descr` TEXT, IN `img` TEXT, IN `color` VARCHAR(50))  INSERT INTO categories(
	cat_er,
	cat_title,
	cat_description,
	cat_image,
	cat_color,
	cat_created
)
VALUES (
	erot,
	title,
	descr,
	img,
	color,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertCatRes` (IN `categ` INT, IN `wgA` INT, IN `wgB` INT, IN `result` TEXT, IN `img` TEXT)  INSERT INTO category_results(
	cr_cat,
	cr_weightFrom,
	cr_weightTo,
	cr_text,
	cr_image,
	cr_created
)
VALUES (
	categ,
	wgA,
	wgB,
	result,
	img,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertErotimatologio` (IN `title` VARCHAR(255), IN `descr` TEXT, IN `active` TINYINT(4), IN `img` VARCHAR(255))  INSERT INTO erotimatologia(
	er_active, 
	er_title, 
	er_description, 
	er_image, 
	er_type,
	er_created
)
VALUES (
	active, 
	title, 
	descr, 
	img,
	0, 
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertErRes` (IN `erot` INT, IN `wgA` INT, IN `wgB` INT, IN `result` TEXT, IN `img` TEXT)  INSERT INTO erotimatologio_results(
	err_er,
	err_weightFrom,
	err_weightTo,
	err_text,
	err_image,
	err_created
)
VALUES (
	erot,
	wgA,
	wgB,
	result,
	img,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertQuestion` (IN `cat` INT, IN `quest` TEXT, IN `qorder` INT, IN `qhelp` TEXT, IN `type` INT)  INSERT INTO questions(
	q_cat,
	q_question,
	q_order,
	q_helptext,
	q_type,
	q_created
)
VALUES (
	cat,
	quest,
	qorder,
	qhelp,
	type,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertStoredReply` (IN `question` INT, IN `answer` INT)  INSERT INTO stored_replies(
	q_id,
	ans_id,
	sr_created
)
VALUES (
	question,
	answer,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `insertUser` (IN `email` VARCHAR(255), IN `pass` VARCHAR(255), IN `uname` VARCHAR(255), IN `notify` INT)  INSERT INTO users(
	user_email,
	user_password,
	user_name,
	user_notify,
	user_created
)
VALUES (
	email,
	pass,
	uname,
	notify,
	CURRENT_TIMESTAMP
)$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateAnswer` (IN `id` INT, IN `anstxt` TEXT, IN `weight` INT)  UPDATE answers
	SET
		ans_text = anstxt,
		ans_weight = weight
	WHERE ans_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateCategory` (IN `id` INT, IN `title` VARCHAR(255), IN `descr` TEXT, IN `img` TEXT, IN `color` VARCHAR(50))  UPDATE categories
	SET
		cat_title = title,
		cat_description = descr,
		cat_image = img,
		cat_color = color
	WHERE cat_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateCatRes` (IN `id` INT, IN `wgA` INT, IN `wgB` INT, IN `result` TEXT, IN `img` TEXT)  UPDATE category_results
	SET
		cr_weightFrom = wgA,
		cr_weightTo = wgB,
		cr_text = result,
		cr_image = img
	WHERE cr_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateErotimatologio` (IN `id` INT, IN `active` TINYINT(4), IN `title` VARCHAR(255), IN `descr` TEXT, IN `img` TEXT)  UPDATE erotimatologia
	SET
		er_active = active,
		er_title = title,
		er_description = descr,
		er_image = img
	WHERE er_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateErRes` (IN `id` INT, IN `wgA` INT, IN `wgB` INT, IN `result` TEXT, IN `img` TEXT)  UPDATE erotimatologio_results
	SET
		err_weightFrom = wgA,
		err_weightTo = wgB,
		err_text = result,
		err_image = img
	WHERE err_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateQuestion` (IN `id` INT, IN `quest` TEXT, IN `qorder` INT, IN `qhelp` TEXT, IN `type` INT)  UPDATE questions
	SET
		q_question = quest,
		q_order = qorder,
		q_helptext = qhelp,
		q_type = type
	WHERE q_id = id$$

CREATE DEFINER=`ampachts`@`%` PROCEDURE `updateUser` (IN `id` INT, IN `email` VARCHAR(255), IN `pass` VARCHAR(255), IN `name` VARCHAR(255), IN `noitfy` INT)  UPDATE users
	SET
		user_email = email,
		user_password = pass,
		user_name = uname,
		user_notify = notify
	WHERE user_id = id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `ans_id` int(11) NOT NULL,
  `ans_q` int(11) NOT NULL,
  `ans_text` text NOT NULL,
  `ans_weight` int(11) NOT NULL,
  `ans_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cat_id` int(11) NOT NULL,
  `cat_er` int(11) NOT NULL,
  `cat_title` varchar(255) NOT NULL,
  `cat_description` text,
  `cat_image` text,
  `cat_color` varchar(128) DEFAULT 'ffffff',
  `cat_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category_results`
--

CREATE TABLE `category_results` (
  `cr_id` int(11) NOT NULL,
  `cr_cat` int(11) NOT NULL,
  `cr_weightFrom` int(11) NOT NULL,
  `cr_weightTo` int(11) NOT NULL,
  `cr_text` text NOT NULL,
  `cr_image` text,
  `cr_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `erotimatologia`
--

CREATE TABLE `erotimatologia` (
  `er_id` int(11) NOT NULL,
  `er_active` tinyint(4) NOT NULL DEFAULT '0',
  `er_title` varchar(255) NOT NULL,
  `er_description` text,
  `er_image` text,
  `er_type` tinyint(4) NOT NULL DEFAULT '1',
  `er_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `erotimatologio_results`
--

CREATE TABLE `erotimatologio_results` (
  `err_id` int(11) NOT NULL,
  `err_er` int(11) NOT NULL,
  `err_weightFrom` int(11) NOT NULL,
  `err_weightTo` int(11) NOT NULL,
  `err_text` text NOT NULL,
  `err_image` text,
  `err_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `q_id` int(11) NOT NULL,
  `q_cat` int(11) NOT NULL,
  `q_question` text NOT NULL,
  `q_order` tinyint(4) DEFAULT '0',
  `q_helptext` text,
  `q_type` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1=checkbox, 2=radio, 3=text',
  `q_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `stored_replies`
--

CREATE TABLE `stored_replies` (
  `sr_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `q_id` int(11) NOT NULL,
  `ans_id` int(11) NOT NULL,
  `sr_created` date NOT NULL,
  `sr_text` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_notify` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=no,1=yes',
  `user_created` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_password`, `user_name`, `user_notify`, `user_created`) VALUES
(1, 'admin', 'admin', 'admin', 1, '2016-08-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`ans_id`),
  ADD KEY `q_id` (`ans_q`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cat_id`),
  ADD KEY `er_id` (`cat_er`);

--
-- Indexes for table `category_results`
--
ALTER TABLE `category_results`
  ADD PRIMARY KEY (`cr_id`),
  ADD KEY `cat_id` (`cr_cat`),
  ADD KEY `cat_id_2` (`cr_cat`);

--
-- Indexes for table `erotimatologia`
--
ALTER TABLE `erotimatologia`
  ADD PRIMARY KEY (`er_id`);

--
-- Indexes for table `erotimatologio_results`
--
ALTER TABLE `erotimatologio_results`
  ADD PRIMARY KEY (`err_id`),
  ADD KEY `er_id` (`err_er`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`q_id`),
  ADD KEY `cat_id` (`q_cat`);

--
-- Indexes for table `stored_replies`
--
ALTER TABLE `stored_replies`
  ADD PRIMARY KEY (`sr_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `q_id` (`q_id`),
  ADD KEY `ans_id` (`ans_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `ans_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `category_results`
--
ALTER TABLE `category_results`
  MODIFY `cr_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `erotimatologia`
--
ALTER TABLE `erotimatologia`
  MODIFY `er_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `erotimatologio_results`
--
ALTER TABLE `erotimatologio_results`
  MODIFY `err_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `q_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `stored_replies`
--
ALTER TABLE `stored_replies`
  MODIFY `sr_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `Question` FOREIGN KEY (`ans_q`) REFERENCES `questions` (`q_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `Erotimatologio` FOREIGN KEY (`cat_er`) REFERENCES `erotimatologia` (`er_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_results`
--
ALTER TABLE `category_results`
  ADD CONSTRAINT `CategoryToResult` FOREIGN KEY (`cr_cat`) REFERENCES `categories` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `erotimatologio_results`
--
ALTER TABLE `erotimatologio_results`
  ADD CONSTRAINT `EritomatToResult` FOREIGN KEY (`err_er`) REFERENCES `erotimatologia` (`er_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `Category` FOREIGN KEY (`q_cat`) REFERENCES `categories` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stored_replies`
--
ALTER TABLE `stored_replies`
  ADD CONSTRAINT `AnswerReply` FOREIGN KEY (`ans_id`) REFERENCES `answers` (`ans_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `QuestionReply` FOREIGN KEY (`q_id`) REFERENCES `questions` (`q_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
