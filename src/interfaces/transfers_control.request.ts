export interface TransfersControlResendOTPRequestData {
  transfer_code: string;
  reason: string;
}

export interface TransfersControlFinalizeDisableOTPRequestData {
  otp: string;
}
