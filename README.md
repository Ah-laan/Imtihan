# Barey Secondary School – Static MCQ Exam Portal

A 100% static online multiple-choice examination portal designed for GitHub Pages.

## Features

- Student login
- Student dashboard
- MCQ-only exams
- Four options: A, B, C, D
- Countdown timer
- Automatic submission when time expires
- Automatic correction and grading
- Pass/fail calculation
- Answer review
- Result history
- CSV question import
- CSV result export
- Print results
- Responsive desktop/mobile design
- localStorage persistence
- No backend required
- No database required
- No logo included

## Demo student

Student ID: `ST001`  
Password: `1234`

Other demo students use password `1234`.

## CSV import format

```csv
Question,Option A,Option B,Option C,Option D,Correct Answer,Marks
What is 2 + 2?,3,4,5,6,B,1
```

The Admin/Teacher page validates the CSV, previews valid questions, and imports them into the selected exam.

## GitHub Pages deployment

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. Open the GitHub Pages URL shown by GitHub.

No build command is needed.

## Important static-system limitation

This project intentionally uses only HTML, CSS, JavaScript and browser localStorage. GitHub Pages does not provide a secure database/backend.

Therefore:
- Student accounts are client-side demo accounts.
- Admin/teacher controls are not secure server-side authentication.
- Results are stored in each browser's localStorage.
- Results do not automatically synchronize between different devices.
- Correct answers exist in the client-side application and therefore cannot be protected from a technically skilled user.

For a production examination system with secure accounts, centralized results and protected answer keys, a backend/database is required.

## Files

- `index.html` – landing page
- `login.html` – student login
- `student-dashboard.html` – student dashboard
- `exam.html` – exam interface
- `result.html` – result and answer review
- `admin.html` – CSV import and management panel
- `data.js` – demo students/exams and localStorage data layer
- `auth.js` – student authentication
- `exam.js` – timer, answer saving and automatic grading
- `results.js` – result rendering and CSV export
- `admin.js` – CSV parser/import and admin functions
- `style.css` – responsive design
- `sample-exam.csv` – sample import file


## Latest update
- Admin/Teacher-only exam management.
- Microsoft Word `.DOCX` MCQ import with preview and validation.
- Students must enter their full three-part name and Student ID before starting.
- Students cannot view results, scores, grades, PASS/FAIL or answer review.
- Admin can download all results as CSV including candidate name and candidate ID.
- No logo included.
- DOCX reading uses Mammoth from a public CDN, so internet is needed while importing Word files. The portal itself remains 100% static.
