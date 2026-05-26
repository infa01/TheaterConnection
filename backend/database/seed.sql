INSERT INTO theatres (name, location, description) VALUES
('Royal Theatre', 'Thessaloniki', 'A historic theatre in the city center.'),
('Athens Drama Hall', 'Athens', 'Modern theatre venue with multiple halls.');

INSERT INTO shows (theatre_id, title, description, duration, age_rating) VALUES
(1, 'Hamlet', 'A classic tragedy by William Shakespeare.', 160, '12+'),
(1, 'Antigone', 'Ancient Greek tragedy by Sophocles.', 90, '10+'),
(2, 'The Phantom of the Opera', 'A musical theatre performance.', 150, '12+');

INSERT INTO showtimes (show_id, show_date, show_time, hall, price) VALUES
(1, '2026-06-10', '20:00:00', 'Main Hall', 18.00),
(1, '2026-06-11', '20:00:00', 'Main Hall', 18.00),
(2, '2026-06-12', '19:30:00', 'Stage A', 14.00),
(3, '2026-06-15', '21:00:00', 'Opera Hall', 25.00);

INSERT INTO seats (theatre_id, seat_row, seat_number, category) VALUES
(1, 'A', 1, 'premium'),
(1, 'A', 2, 'premium'),
(1, 'A', 3, 'premium'),
(1, 'B', 1, 'standard'),
(1, 'B', 2, 'standard'),
(1, 'B', 3, 'standard'),
(2, 'A', 1, 'premium'),
(2, 'A', 2, 'premium'),
(2, 'B', 1, 'standard'),
(2, 'B', 2, 'standard');