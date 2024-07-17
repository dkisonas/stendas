<?php

function handle_webcam_image($contact_form) {
    $submission = WPCF7_Submission::get_instance();
    if ($submission) {
        $posted_data = $submission->get_posted_data();
        if (isset($posted_data['webcam_image'])) {
            $img = $posted_data['webcam_image'];
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
            $data = base64_decode($img);
            $upload_dir = wp_upload_dir();
            $file = $upload_dir['path'] . '/' . uniqid() . '.png';
            file_put_contents($file, $data);

            // Debugging statements
            error_log("Image data received and processed: " . $file);

            // Optionally, attach the file to the email
            $mail = $contact_form->prop('mail');
            $attachments = isset($mail['attachments']) ? (array) $mail['attachments'] : [];
            $attachments[] = $file;
            $mail['attachments'] = implode("\n", $attachments);
            $contact_form->set_properties(array('mail' => $mail));

            // Debugging statements
            error_log("Email properties updated with attachment: " . print_r($mail, true));
        } else {
            error_log("webcam_image field is not set in posted data.");
        }
    } else {
        error_log("No submission instance found.");
    }
}

add_action('wpcf7_before_send_mail', 'handle_webcam_image');