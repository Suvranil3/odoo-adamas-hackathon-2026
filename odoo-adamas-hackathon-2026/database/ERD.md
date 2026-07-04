# ERD

## Text-based ER diagram

```text
+------------------+       +-------------------+
| users            |       | employees         |
|------------------|       |-------------------|
| PK id            |<----->| PK id             |
| full_name        |       | FK user_id        |
| email            |       | employee_code     |
| password_hash    |       | department        |
| role             |       | position          |
| status           |       | phone             |
| created_at       |       | address           |
| updated_at       |       | hire_date         |
+------------------+       | salary            |
                            | status            |
                            | created_at        |
                            | updated_at        |
                            +-------------------+
                                     |
                                     | 1
                                     |
                                     |
                                     | 0..*
+-------------------+       +-------------------+
| attendance        |       | leave_requests    |
|-------------------|       |-------------------|
| PK id             |       | PK id             |
| FK employee_id    |<------| FK employee_id    |
| date              |       | leave_type        |
| check_in          |       | start_date        |
| check_out         |       | end_date          |
| status            |       | days              |
| remarks           |       | reason            |
| created_at        |       | status            |
| updated_at        |       | requested_at      |
+-------------------+       | reviewed_at       |
                            | FK reviewed_by    |
                            +-------------------+
                                     |
                                     |
                                     |
+-------------------+
| payroll           |
|-------------------|
| PK id             |
| FK employee_id    |
| pay_period_start  |
| pay_period_end    |
| basic_salary      |
| allowances        |
| deductions        |
| net_salary        |
| status            |
| generated_at      |
| paid_at           |
+-------------------+
```

## Relationships

- users 1 --- 1 employees
- employees 1 --- 0..* attendance
- employees 1 --- 0..* leave_requests
- employees 1 --- 0..* payroll
- users 1 --- 0..* leave_requests.reviewed_by
