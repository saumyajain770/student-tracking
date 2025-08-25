-- Insert sample data for testing

-- Sample students
INSERT INTO students (first_name, last_name, email, phone, status, source) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', 'interested', 'website'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0102', 'applied', 'referral'),
('Mike', 'Johnson', 'mike.johnson@email.com', '555-0103', 'enrolled', 'open_house'),
('Sarah', 'Williams', 'sarah.williams@email.com', '555-0104', 'interested', 'social_media'),
('David', 'Brown', 'david.brown@email.com', '555-0105', 'applied', 'workshop'),
('Lisa', 'Davis', 'lisa.davis@email.com', '555-0106', 'enrolled', 'referral'),
('Tom', 'Wilson', 'tom.wilson@email.com', '555-0107', 'declined', 'website'),
('Amy', 'Taylor', 'amy.taylor@email.com', '555-0108', 'interested', 'open_house');

-- Sample events
INSERT INTO events (name, description, event_type, event_date, location, capacity, registered_count, attended_count, status) VALUES
('Spring Open House', 'Campus tour and program information session', 'open_house', '2024-03-15', 'Main Campus', 100, 85, 72, 'completed'),
('Web Development Workshop', 'Hands-on coding workshop for beginners', 'workshop', '2024-03-22', 'Tech Lab', 30, 28, 25, 'completed'),
('Career Fair', 'Meet with industry professionals and alumni', 'career_fair', '2024-04-10', 'Student Center', 200, 150, 135, 'completed'),
('Summer Information Session', 'Learn about summer programs and courses', 'info_session', '2024-05-20', 'Online', 50, 45, 42, 'completed'),
('Fall Open House', 'Campus tour and program information session', 'open_house', '2024-09-15', 'Main Campus', 120, 95, 0, 'planned');

-- Sample event registrations
INSERT INTO event_registrations (student_id, event_id, attended) VALUES
(1, 1, true), (2, 1, true), (3, 1, true), (4, 1, false),
(1, 2, true), (5, 2, true), (6, 2, false),
(2, 3, true), (3, 3, true), (7, 3, true), (8, 3, true),
(4, 4, true), (5, 4, true), (6, 4, true);

-- Sample applications
INSERT INTO applications (student_id, program, status, notes, decision_date) VALUES
(2, 'Computer Science', 'accepted', 'Strong portfolio and interview', '2024-04-01'),
(3, 'Web Development', 'accepted', 'Excellent technical skills', '2024-03-28'),
(5, 'Data Science', 'under_review', 'Pending final interview', NULL),
(6, 'Computer Science', 'accepted', 'Great academic background', '2024-04-05'),
(7, 'Web Development', 'rejected', 'Did not meet technical requirements', '2024-04-02');

-- Sample interactions
INSERT INTO student_interactions (student_id, interaction_type, description, outcome, staff_member) VALUES
(1, 'email', 'Sent program information and application details', 'follow_up_needed', 'Sarah Johnson'),
(2, 'phone', 'Discussed application process and requirements', 'interested', 'Mike Davis'),
(3, 'meeting', 'Campus visit and program tour', 'very_interested', 'Sarah Johnson'),
(4, 'email', 'Follow-up after open house attendance', 'interested', 'Lisa Wilson'),
(5, 'phone', 'Application status update', 'anxious_for_decision', 'Mike Davis'),
(6, 'meeting', 'Enrollment confirmation and next steps', 'enrolled', 'Sarah Johnson'),
(7, 'email', 'Application decision notification', 'disappointed', 'Lisa Wilson'),
(8, 'phone', 'Initial inquiry about programs', 'interested', 'Mike Davis');
