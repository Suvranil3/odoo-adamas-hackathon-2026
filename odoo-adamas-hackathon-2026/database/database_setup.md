# Database setup

## MySQL Workbench import guide

1. Open MySQL Workbench and connect to your local MySQL server.
2. Create a new database schema or use an existing one.
3. Open the SQL file editor and run the schema script:
   - [database/schema.sql](schema.sql)
4. After the schema is created successfully, import the seed data:
   - [database/seed.sql](seed.sql)
5. For extra test records, optionally run:
   - [database/sample_data.sql](sample_data.sql)
6. Verify the tables in the Schemas panel:
   - users
   - employees
   - attendance
   - leave_requests
   - payroll

## Recommended import order

1. schema.sql
2. seed.sql
3. sample_data.sql

## Notes

- The schema creates the database named `hrms_db` automatically.
- The seed file populates an admin user, employee users, attendance entries, leave requests, and payroll rows.
- The sample data file adds additional realistic records for testing and UI demos.
