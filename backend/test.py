import smtplib, ssl

smtp_server = "smtp.gmail.com"
port = 587  # For starttls

import smtplib, ssl

port = 587  # For starttls
smtp_server = "smtp.gmail.com"
sender_email = "eventer2023@gmail.com"
password = "lewtifbyfbkescov"
receiver_email = "chaudharyaditya0005@gmail.com"

message = """\
Subject: Hi there

This message is sent from Python."""

context = ssl.create_default_context()
with smtplib.SMTP(smtp_server, port) as server:
    server.ehlo()  # Can be omitted
    server.starttls(context=context)
    server.ehlo()  # Can be omitted
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, message)