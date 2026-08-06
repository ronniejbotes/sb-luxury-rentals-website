<?php
/**
 * SB Luxury Rentals — quote form handler.
 *
 * Deployed alongside the static build in public_html. Hostinger shared hosting
 * has PHP mail() available by default, so no third-party form service is needed
 * and no API key ends up in the front-end bundle.
 *
 * If you ever move to a host without PHP, swap the fetch URL in
 * src/pages/Quote.tsx for a Web3Forms/Formspree endpoint — nothing else changes.
 */

declare(strict_types=1);

const TO_EMAIL   = 'info@sbluxuryrentals.co.za';
const FROM_EMAIL = 'info@sbluxuryrentals.co.za'; // must be a mailbox on this domain
const SITE_NAME  = 'SB Luxury Rentals';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function fail(string $message, int $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    fail('Method not allowed.', 405);
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '' || strlen($raw) > 20000) {
    fail('Empty or oversized request.');
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    fail('Malformed request.');
}

/** Trim, collapse whitespace and strip anything that could forge a mail header. */
function clean(mixed $value, int $max = 500): string {
    if (is_array($value)) {
        $value = implode(', ', array_map(static fn($v) => (string) $v, $value));
    }
    $value = (string) $value;
    $value = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value);
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');
    return mb_substr($value, 0, $max);
}

// Bots fill in every field they can see; this one is hidden from humans.
if (clean($data['company'] ?? '') !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

$name      = clean($data['name'] ?? '', 120);
$phone     = clean($data['phone'] ?? '', 40);
$email     = clean($data['email'] ?? '', 160);
$eventType = clean($data['eventType'] ?? '', 80);
$eventDate = clean($data['eventDate'] ?? '', 40);
$hours     = clean($data['hours'] ?? '', 40);
$area      = clean($data['area'] ?? '', 120);
$cars      = clean($data['cars'] ?? '', 400);
$details   = clean($data['details'] ?? '', 2000);

if ($name === '' || $phone === '' || $email === '') {
    fail('Name, phone and email are required.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail('That email address does not look right.');
}
if ($cars === '') {
    fail('Pick at least one car so we know what to quote on.');
}

$rows = [
    'Name'         => $name,
    'Phone'        => $phone,
    'Email'        => $email,
    'Occasion'     => $eventType !== '' ? $eventType : '—',
    'Date'         => $eventDate !== '' ? $eventDate : 'Not given',
    'Length'       => $hours !== '' ? $hours : 'Not given',
    'Pickup area'  => $area !== '' ? $area : 'Not given',
    'Cars'         => $cars,
    'Notes'        => $details !== '' ? $details : '—',
];

$plain = "New quote request from the website\n\n";
foreach ($rows as $label => $value) {
    $plain .= str_pad($label . ':', 14) . $value . "\n";
}
$plain .= "\nSubmitted: " . date('Y-m-d H:i') . " SAST\n";

$html = '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#111">'
      . '<h2 style="margin:0 0 16px">New quote request</h2><table cellpadding="6" cellspacing="0" border="0">';
foreach ($rows as $label => $value) {
    $html .= '<tr><td style="color:#666;vertical-align:top"><strong>' . htmlspecialchars($label, ENT_QUOTES, 'UTF-8')
           . '</strong></td><td>' . nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8')) . '</td></tr>';
}
$html .= '</table><p style="color:#888;font-size:12px;margin-top:20px">Sent from sbluxuryrentals.co.za</p></div>';

$boundary = 'sblr-' . bin2hex(random_bytes(8));
$body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n$plain\r\n"
      . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\n\r\n$html\r\n"
      . "--$boundary--";

$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    "Content-Type: multipart/alternative; boundary=\"$boundary\"",
    'From: ' . SITE_NAME . ' Website <' . FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
]);

$subject = 'Quote request — ' . $name . ' — ' . ($cars !== '' ? $cars : 'no car selected');

$sent = @mail(TO_EMAIL, $subject, $body, $headers, '-f' . FROM_EMAIL);

if (!$sent) {
    fail('The mail server rejected the message. Please WhatsApp or email us directly.', 502);
}

echo json_encode(['ok' => true]);
