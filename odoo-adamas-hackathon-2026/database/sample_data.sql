USE hrms_db;

INSERT INTO users (full_name, email, password_hash, role, status) VALUES
  ('Sanjay Gupta', 'sanjay.gupta@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  ('Anjali Desai', 'anjali.desai@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'employee', 'active'),
  ('Vikram Bose', 'vikram.bose@hrms.local', '$2b$10$34sd1Cjy44EIg17UGu3HYe6BRiACoCpMT2l.0RdxmewkawizuiFj.', 'hr', 'active');

INSERT INTO employees (user_id, employee_code, department, position, phone, address, hire_date, salary, status) VALUES
  ((SELECT id FROM users WHERE email = 'sanjay.gupta@hrms.local'), 'EMP006', 'Marketing', 'Marketing Specialist', '+91-9876543215', 'Chennai, India', '2023-02-14', 54000.00, 'active'),
  ((SELECT id FROM users WHERE email = 'anjali.desai@hrms.local'), 'EMP007', 'IT Support', 'Support Engineer', '+91-9876543216', 'Kolkata, India', '2022-07-22', 50000.00, 'active'),
  ((SELECT id FROM users WHERE email = 'vikram.bose@hrms.local'), 'EMP008', 'HR', 'HR Manager', '+91-9876543217', 'Noida, India', '2021-12-01', 90000.00, 'active');

INSERT INTO attendance (employee_id, date, check_in, check_out, status, remarks) VALUES
  ((SELECT id FROM employees WHERE employee_code = 'EMP006'), '2026-06-03', '09:15:00', '18:10:00', 'present', 'Client presentation'),
  ((SELECT id FROM employees WHERE employee_code = 'EMP007'), '2026-06-03', '08:45:00', '17:30:00', 'present', 'Resolved support tickets'),
  ((SELECT id FROM employees WHERE employee_code = 'EMP008'), '2026-06-03', '09:00:00', '18:00:00', 'present', 'Team meeting');

INSERT INTO leave_requests (employee_id, leave_type, start_date, end_date, days, reason, status, requested_at) VALUES
  ((SELECT id FROM employees WHERE employee_code = 'EMP006'), 'personal', '2026-06-25', '2026-06-26', 2, 'Family event', 'pending', '2026-06-20 10:00:00'),
  ((SELECT id FROM employees WHERE employee_code = 'EMP007'), 'sick', '2026-06-18', '2026-06-18', 1, 'Seasonal flu', 'approved', '2026-06-17 11:30:00');

INSERT INTO payroll (employee_id, pay_period_start, pay_period_end, basic_salary, allowances, deductions, net_salary, status, generated_at) VALUES
  ((SELECT id FROM employees WHERE employee_code = 'EMP006'), '2026-05-01', '2026-05-31', 54000.00, 2200.00, 600.00, 55600.00, 'processed', '2026-06-01 09:25:00'),
  ((SELECT id FROM employees WHERE employee_code = 'EMP007'), '2026-05-01', '2026-05-31', 50000.00, 1800.00, 500.00, 51300.00, 'paid', '2026-06-01 09:30:00'),
  ((SELECT id FROM employees WHERE employee_code = 'EMP008'), '2026-05-01', '2026-05-31', 90000.00, 6000.00, 1200.00, 93800.00, 'processed', '2026-06-01 09:35:00');