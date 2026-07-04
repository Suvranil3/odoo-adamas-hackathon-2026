USE hrms_db;

INSERT INTO users (id, full_name, email, password_hash, role, status) VALUES
  (1, 'Aarav Sharma', 'admin@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'admin', 'active'),
  (2, 'Nisha Patel', 'nisha.patel@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  (3, 'Rahul Verma', 'rahul.verma@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  (4, 'Meera Iyer', 'meera.iyer@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  (5, 'Karan Singh', 'karan.singh@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  (6, 'Priya Rao', 'priya.rao@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active');

INSERT INTO employees (id, user_id, employee_code, department, position, phone, address, hire_date, salary, status) VALUES
  (1, 2, 'EMP001', 'Engineering', 'Software Engineer', '+91-9876543210', 'Bengaluru, India', '2024-01-15', 85000.00, 'active'),
  (2, 3, 'EMP002', 'Human Resources', 'HR Associate', '+91-9876543211', 'Mumbai, India', '2023-09-01', 62000.00, 'active'),
  (3, 4, 'EMP003', 'Finance', 'Accountant', '+91-9876543212', 'Hyderabad, India', '2022-11-20', 68000.00, 'active'),
  (4, 5, 'EMP004', 'Sales', 'Sales Executive', '+91-9876543213', 'Delhi, India', '2024-03-10', 59000.00, 'active'),
  (5, 6, 'EMP005', 'Operations', 'Operations Analyst', '+91-9876543214', 'Pune, India', '2023-06-05', 71000.00, 'active');

INSERT INTO attendance (employee_id, date, check_in, check_out, status, remarks) VALUES
  (1, '2026-06-01', '09:00:00', '18:00:00', 'present', 'On time'),
  (1, '2026-06-02', '09:30:00', '18:30:00', 'late', 'Traffic delay'),
  (2, '2026-06-01', '08:50:00', '17:30:00', 'present', 'On time'),
  (3, '2026-06-01', '10:00:00', '18:00:00', 'half_day', 'Client meeting'),
  (4, '2026-06-02', NULL, NULL, 'absent', 'Medical leave'),
  (5, '2026-06-01', '09:10:00', '17:50:00', 'present', 'On time');

INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, days, reason, status, requested_at, reviewed_at, reviewed_by) VALUES
  (1, 'annual', '2026-06-10', '2026-06-12', 3, 'Family vacation', 'approved', '2026-06-05 10:00:00', '2026-06-06 12:00:00', 1),
  (3, 'sick', '2026-06-15', '2026-06-15', 1, 'Fever and rest', 'pending', '2026-06-14 09:15:00', NULL, NULL),
  (4, 'personal', '2026-06-20', '2026-06-21', 2, 'Personal work', 'approved', '2026-06-16 14:00:00', '2026-06-17 09:00:00', 1);

INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, basic_salary, allowances, deductions, net_salary, status, generated_at, paid_at) VALUES
  (1, '2026-05-01', '2026-05-31', 85000.00, 5000.00, 1200.00, 88800.00, 'paid', '2026-06-01 09:00:00', '2026-06-03 10:00:00'),
  (2, '2026-05-01', '2026-05-31', 62000.00, 3000.00, 800.00, 64200.00, 'processed', '2026-06-01 09:05:00', NULL),
  (3, '2026-05-01', '2026-05-31', 68000.00, 4000.00, 900.00, 70100.00, 'paid', '2026-06-01 09:10:00', '2026-06-03 10:15:00'),
  (4, '2026-05-01', '2026-05-31', 59000.00, 2500.00, 700.00, 60800.00, 'draft', '2026-06-01 09:15:00', NULL),
  (5, '2026-05-01', '2026-05-31', 71000.00, 4500.00, 1000.00, 74500.00, 'processed', '2026-06-01 09:20:00', NULL);