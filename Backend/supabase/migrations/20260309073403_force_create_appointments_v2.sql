
CREATE TABLE IF NOT EXISTS appointments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) NOT NULL,
    shop_id text NOT NULL,
    service_type text NOT NULL,
    appointment_date timestamp with time zone NOT NULL,
    notes text,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE IF NOT EXISTS otp_codes (
    email text NOT NULL PRIMARY KEY,
    otp_code text NOT NULL,
    expires_at timestamp NOT NULL,
    isUsed BOOLEAN
)
ALTER TABLE otp_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY"internal admin access only" ON otp_codes FOR ALL TO SERVICE_ROLE USING(true);
CREATE POLICY "Users can insert their own" ON appointments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own" ON appointments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own" ON appointments;

CREATE POLICY "Users can insert their own appointments"
ON appointments
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
);

CREATE POLICY "Users can view their own appointments"
ON appointments
FOR SELECT
USING (
  auth.uid() = user_id
);