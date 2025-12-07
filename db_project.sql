-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 04:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `Course_ID` int(11) NOT NULL,
  `Course_Name` varchar(100) NOT NULL,
  `Credits` int(11) NOT NULL,
  `Course_Description` varchar(100) NOT NULL,
  `Dept_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`Course_ID`, `Course_Name`, `Credits`, `Course_Description`, `Dept_ID`) VALUES
(101, 'Intro to AI', 3, 'Course About intro to AI', 2),
(102, 'Data Science Methodology', 3, 'Course about DSM', 1),
(103, 'Neural Netwrok', 3, 'Course about NN', 2);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `Dept_ID` int(11) NOT NULL,
  `Dept_name` varchar(100) NOT NULL,
  `Building` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`Dept_ID`, `Dept_name`, `Building`) VALUES
(1, 'General', 'Old Building'),
(2, 'AI', 'New Building');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `Enrollment_ID` int(11) NOT NULL,
  `Enrollment_Date` date NOT NULL,
  `Grade` decimal(5,2) DEFAULT NULL,
  `Status` enum('Enrolled','Completed','Withdrawn','Incomplete') NOT NULL,
  `Section_ID` int(11) NOT NULL,
  `Student_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment`
--

INSERT INTO `enrollment` (`Enrollment_ID`, `Enrollment_Date`, `Grade`, `Status`, `Section_ID`, `Student_ID`) VALUES
(1, '2025-11-28', NULL, 'Enrolled', 2, 2001),
(2, '2025-11-28', 95.00, 'Completed', 2, 2002),
(3, '2025-11-28', NULL, 'Incomplete', 1, 2003);

-- --------------------------------------------------------

--
-- Table structure for table `instructor`
--

CREATE TABLE `instructor` (
  `Instructor_ID` int(11) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Dept_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instructor`
--

INSERT INTO `instructor` (`Instructor_ID`, `First_Name`, `Last_Name`, `Email`, `Dept_ID`) VALUES
(1, 'Yasser', 'Fouad', 'yasser.fouad@edu.com', 2),
(2, 'Cristine', 'Basta', 'cristine.basta@edu.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prerequisites`
--

CREATE TABLE `prerequisites` (
  `Course_ID` int(11) NOT NULL,
  `Prereq_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prerequisites`
--

INSERT INTO `prerequisites` (`Course_ID`, `Prereq_ID`) VALUES
(103, 101);

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `Section_ID` int(11) NOT NULL,
  `Section_Type` varchar(100) NOT NULL,
  `Semester` varchar(100) NOT NULL,
  `Year` int(11) NOT NULL,
  `Room` varchar(100) NOT NULL,
  `Schedule_Date` date NOT NULL,
  `Start_Time` time NOT NULL,
  `End_Time` time NOT NULL,
  `Course_ID` int(11) NOT NULL,
  `Instructor_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`Section_ID`, `Section_Type`, `Semester`, `Year`, `Room`, `Schedule_Date`, `Start_Time`, `End_Time`, `Course_ID`, `Instructor_ID`) VALUES
(1, 'Lecture', 'Fall', 2025, '409', '2025-10-01', '10:30:00', '12:00:00', 102, 2),
(2, 'Lecture', 'Fall', 2025, '402', '2025-10-01', '10:30:00', '12:00:00', 101, 1),
(3, 'Lecture', 'Fall', 2025, '409', '2025-10-01', '02:30:00', '04:00:00', 103, 1);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Student_ID` int(11) NOT NULL,
  `First_Name` varchar(100) NOT NULL,
  `Last_Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Phone` varchar(100) NOT NULL,
  `Date_Of_Birth` date NOT NULL,
  `Year_Level` int(11) NOT NULL,
  `Dept_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Student_ID`, `First_Name`, `Last_Name`, `Email`, `Phone`, `Date_Of_Birth`, `Year_Level`, `Dept_ID`) VALUES
(2001, 'Abdelrhman', 'Ayman', 'adodoadodo2006@gmail.com', '01152369633', '2006-08-11', 2, 2),
(2002, 'Fares', 'Shreen', 'fares.shreen@gmail.com', '01152363433', '2005-10-14', 2, 2),
(2003, 'Sohaib', 'Tarek', 'sohaib.tarek@edu.com', '01272589153', '2006-09-13', 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`Course_ID`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`Dept_ID`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`Enrollment_ID`),
  ADD UNIQUE KEY `Section_ID` (`Section_ID`,`Student_ID`),
  ADD KEY `Student_ID` (`Student_ID`);

--
-- Indexes for table `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`Instructor_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- Indexes for table `prerequisites`
--
ALTER TABLE `prerequisites`
  ADD PRIMARY KEY (`Course_ID`,`Prereq_ID`),
  ADD KEY `Prereq_ID` (`Prereq_ID`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`Section_ID`),
  ADD KEY `Course_ID` (`Course_ID`),
  ADD KEY `Instructor_ID` (`Instructor_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Student_ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Dept_ID` (`Dept_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `Enrollment_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `Student_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2019;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`);

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`Section_ID`) REFERENCES `section` (`Section_ID`),
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`Student_ID`) REFERENCES `student` (`Student_ID`);

--
-- Constraints for table `instructor`
--
ALTER TABLE `instructor`
  ADD CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`);

--
-- Constraints for table `prerequisites`
--
ALTER TABLE `prerequisites`
  ADD CONSTRAINT `prerequisites_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`),
  ADD CONSTRAINT `prerequisites_ibfk_2` FOREIGN KEY (`Prereq_ID`) REFERENCES `course` (`Course_ID`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `course` (`Course_ID`),
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`Instructor_ID`) REFERENCES `instructor` (`Instructor_ID`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Dept_ID`) REFERENCES `department` (`Dept_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
