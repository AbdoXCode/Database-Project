# University System Database Project

A comprehensive university enrollment management system designed to manage data related to students, instructors, courses, departments, and sections. The system ensures accurate tracking of course information, student registrations, prerequisites, and assignments.

## Contributors

We would like to thank the following people for their contributions to this project:

| Name | Role | GitHub |
|------|------|--------|
| **Abdelrhman Ayman** | Project lead, main development (SQL & Backend) | [GitHub](https://github.com/AbdoXCode) |
| **Fares Shreen** | UI design and frontend | [GitHub](https://github.com/Fares-Shreen) |
| **Ziad Ehab** | ERD Diagram | - |

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Database Entities](#database-entities)
- [Entity Relationships](#entity-relationships)
- [Data Dictionary](#data-dictionary)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

---

## Introduction

This project is a university enrollment management system designed to manage data related to students, instructors, courses, departments, and sections. The goal is to ensure that the information of courses, student registrations, prerequisites, and assignments are accurate and easily accessible.

---

## Features

- **Student Management**: Track student demographic, academic, and contact information
- **Instructor Management**: Manage teaching staff and their assignments
- **Course Catalog**: Maintain course information including prerequisites
- **Section Scheduling**: Schedule course sections with time, location, and instructor details
- **Enrollment Tracking**: Monitor student registrations and grades
- **Department Organization**: Organize academic units and their offerings
- **Mentor System**: Optional instructor-student mentorship tracking

---

## Database Entities

### 1. STUDENT
Represents a learner enrolled in the institution. Stores demographic, academic, and contact information.

### 2. INSTRUCTOR
Represents a teaching staff member responsible for offering instruction, mentoring students, and being assigned to course sections.

### 3. DEPARTMENT
The academic unit responsible for offering majors, hiring instructors, and supervising academic programs.

### 4. COURSE
Represents an academic subject offered by the university. Courses may have prerequisite relationships.

### 5. SECTION
Represents a specific delivery of a course in a particular semester, year, time slot, and room taught by a specific instructor.

### 6. ENROLLMENT
Associative entity capturing which student registers in which section, along with enrollment details (grade, status, dates).

---

## Entity Relationships

### STUDENT ↔ ENROLLMENT
- **Relationship**: "Enrolled In"
- **Type**: 1-to-Many
- **Description**: One student can have many enrollment records; each enrollment belongs to one student
- **Participation**: Student (Partial), Enrollment (Total)

### SECTION ↔ ENROLLMENT
- **Relationship**: "Scheduled As"
- **Type**: 1-to-Many
- **Description**: One section can have many enrollments; each enrollment belongs to one section
- **Participation**: Section (Partial), Enrollment (Total)

### COURSE ↔ SECTION
- **Relationship**: "Presents"
- **Type**: 1-to-Many
- **Description**: One course can have many sections
- **Participation**: Course (Partial), Section (Total)

### COURSE ↔ COURSE (Prerequisites)
- **Relationship**: "Prerequisites"
- **Type**: Many-to-Many (recursive)
- **Description**: One course can have many prerequisites; one course can be a prerequisite to many others

### DEPARTMENT ↔ COURSE
- **Relationship**: "Offers"
- **Type**: 1-to-Many
- **Description**: One department offers multiple courses; each course belongs to one department
- **Participation**: Department (Partial), Course (Total)

### DEPARTMENT ↔ STUDENT
- **Relationship**: "Majors In"
- **Type**: Many-to-One
- **Description**: Many students belong to one department
- **Participation**: Student (Total), Department (Partial)

### DEPARTMENT ↔ INSTRUCTOR
- **Relationship**: "Employs"
- **Type**: 1-to-Many
- **Description**: One department employs multiple instructors
- **Participation**: Instructor (Total), Department (Partial)

### INSTRUCTOR ↔ STUDENT
- **Relationship**: "Mentors"
- **Type**: 1-to-Many (optional)
- **Description**: One instructor may mentor many students
- **Participation**: Both Partial

### INSTRUCTOR ↔ SECTION
- **Relationship**: "Teaches"
- **Type**: 1-to-Many
- **Description**: One instructor teaches many sections; each section has exactly one instructor
- **Participation**: Section (Total), Instructor (Partial)

---

## Data Dictionary

### STUDENT Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Student_ID** | PK | Unique numeric/character ID assigned to each student | Primary Key |
| First_Name | Simple | Student's given name | - |
| Last_Name | Simple | Student's family name | - |
| Full_Name | Composite | Concatenation of first + last name | Derived |
| Email | Simple | Student email address | Unique |
| Phone | Simple | Student phone number | - |
| Date_of_Birth | Simple | Birthdate | - |
| Year_Level | Simple | Academic standing (e.g., Freshman, Sophomore) | - |

### INSTRUCTOR Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Instructor_ID** | PK | Unique ID of instructor | Primary Key |
| First_Name | Simple | Instructor given name | - |
| Last_Name | Simple | Instructor family name | - |
| Full_Name | Composite | Derived concatenation | Composite |
| Email | Simple | Professional email | Unique |

### DEPARTMENT Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Dept_ID** | PK | Unique identifier for a department | Primary Key |
| Dept_Name | Simple | Department name | - |
| Building | Simple | Physical building where the department is located | - |

### COURSE Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Course_ID** | PK | Unique course code | Primary Key |
| Course_Name | Simple | Official course title | - |
| Course_Description | Simple | Summary of course subject | - |
| Credits | Simple | Number of credit hours | - |

### SECTION Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Section_ID** | PK | Unique section number | Primary Key |
| Section_Type | Simple | Class type (e.g., Lecture, Lab) | - |
| Schedule_Date | Simple | Date(s) section meets | - |
| Start_Time | Simple | Class start time | - |
| End_Time | Simple | Class end time | - |
| Room | Simple | Room identifier | - |
| Semester | Simple | e.g., Fall, Spring | - |
| Year | Simple | Academic year | - |

### ENROLLMENT Entity

| Attribute | Type | Description | Notes |
|-----------|------|-------------|-------|
| **Enrollment_ID** | PK | Unique registration record ID | Primary Key |
| Enrollment_Date | Simple | Date student enrolled in the section | - |
| Grade | Simple | Final grade earned | - |
| Status | Simple | e.g., Enrolled, Dropped, Completed | - |
| Student_ID | FK | ID of the student | Foreign Key → STUDENT |
| Section_ID | FK | ID of the section | Foreign Key → SECTION |
| (Course_ID) | Derived | Not stored; inferred through Section → Course | Derived |

---

## Installation

```bash
# Clone the repository
git clone https://github.com/AbdoXCode/Database-Project.git

# Navigate to project directory
cd Database-Project

# Install dependencies (if applicable)
# Add your installation commands here
```
---

## Contact

For questions or suggestions, please contact the project team through their GitHub profiles listed in the Contributors section.

---

**Project Status**: Finished Development

**Last Updated**: December 2025
