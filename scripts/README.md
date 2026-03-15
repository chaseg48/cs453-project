# CS453/553 Client-Server Architecture Project

This repository contains the **starter template** for the semester project in  
**CS453 / CS553 – Client/Server Architectures**.

Students will build and extend a distributed web application over the course
of the semester. The system will evolve through several architectural stages,
mirroring the historical evolution of modern web systems.

The goal of the project is to help students understand **how real client/server
systems are designed and built**, including:

- REST API design
- database integration
- authentication and authorization
- multi-service architectures
- real-time communication
- modern API technologies

---

# Project Overview

The semester project is a **Task / Project Management System**.

The application allows users to:

- create projects
- create tasks within projects
- assign tasks to users
- track task status
- comment on tasks
- view project activity

This domain is intentionally simple so that the focus remains on **system
architecture and communication between components**, rather than complex
business logic.

---

# Architecture Overview

The system follows a typical web architecture.



CS465_565-01-Syllabus-Summer25.md
File
So I am teaching Network Security again this summer.  Attached is my Syllabus from last summer.  I would like to update the course to technology advancements.  I would also like to do more practical examples and projects, not just cryptography and attacks in the abstract, but like really network security practices that are used.  Also I would like to talk about post-quatum cryptography and newer concepts.

Dr. Code Monkey, your existing course is already built on a good old-school backbone—cryptography fundamentals, protocol attacks, and practical labs. That foundation matters. Security engineering still rests on the same pillars: math, protocols, and careful threat models. But the battlefield has changed dramatically in the last 5–7 years.

The trick is not throwing out the classic material. The trick is connecting it to modern systems students actually encounter: cloud networks, zero-trust architectures, software supply chains, and AI-assisted attacks.

After reading your current syllabus and schedule

, here’s how I’d evolve the course without losing its intellectual spine.

Big Structural Changes I Would Make
Three shifts will modernize the course immediately.

First: Move from crypto-first to threat-first.

Right now the course begins with DES and AES. Historically sensible, but modern security teams start with threat modeling and attack surface analysis. Students should see the problem before the math that solves it.

Second: Replace abstract attacks with operational security practice.

Instead of “DNS cache poisoning as a lecture topic,” students should actually:

capture DNS traffic

simulate poisoning

deploy DNSSEC

observe mitigation

Third: Add modern domains of security.

There are entire fields now missing from the syllabus:

Zero Trust Architecture

Cloud security

Supply chain attacks

Container security

Post-quantum cryptography

AI-assisted cyber attacks

Modern authentication (OAuth, OIDC, WebAuthn)

A Modernized Topic Flow
Instead of the current week layout, I’d shift the conceptual arc like this.

Week 1 — The Reality of Modern Attacks
Threat modeling and real breach case studies.

Topics

attack surface mapping

kill chain model

MITRE ATT&CK framework

SolarWinds breach

Colonial Pipeline

Practical
Students build a threat model for a simple web service.

Week 2 — Network Visibility
Security begins with seeing the network.

Topics

packet capture

NetFlow

traffic analysis

encrypted traffic fingerprinting

Tools

Wireshark

Zeek

tcpdump

Lab
Analyze real network traffic and identify anomalies.

Week 3 — Modern Cryptography in Practice
Only now do we introduce crypto.

Topics

symmetric crypto

public key crypto

TLS handshake

certificate chains

certificate transparency

Lab
Students inspect TLS sessions and break weak configurations.

Week 4 — Authentication and Identity
This is a huge modern shift.

Topics

password attacks

MFA

OAuth

OpenID Connect

WebAuthn / passkeys

Lab
Break a password database and then deploy MFA.

Week 5 — DNS and Internet Infrastructure
Students should understand the plumbing.

Topics

DNS attacks

DNSSEC

BGP hijacking

Lab
Simulate DNS poisoning in a controlled lab.

Week 6 — Firewalls and Zero Trust
Traditional perimeter models vs modern architectures.

Topics

firewalls

microsegmentation

zero trust networking

identity aware proxies

Lab
Build a segmented network and test lateral movement.

Week 7 — Cloud Network Security
Students today must understand cloud networking.

Topics

AWS VPC security

security groups

IAM

network isolation

Lab
Secure an AWS or OpenStack deployment.

Week 8 — Intrusion Detection and Monitoring
Actual SOC-style monitoring.

Topics

SIEM systems

anomaly detection

behavioral analytics

Tools

Zeek

Suricata

Security Onion

Lab
Detect attacks in captured network traffic.

Week 9 — Modern Attacks
Students love this week.

Topics

supply chain attacks

container escapes

ransomware

AI-generated phishing

Lab
Analyze a simulated ransomware infection.

Week 10 — Post-Quantum Cryptography
New frontier.

Topics

why RSA and ECC break under quantum computing

lattice cryptography

NIST PQC finalists

hybrid cryptography

Students test PQC libraries.

Practical Projects That Students Love
Here are projects that produce real security engineers.

Project 1 — Build a Network Sensor
Students deploy Zeek or Suricata and detect attacks.

Project 2 — Break TLS Misconfiguration
Students exploit weak TLS configurations.

Project 3 — Build a Secure Network
Students design and deploy a segmented secure network.

Graduate Project
Research project on emerging security tech:

Examples

post-quantum TLS

AI malware detection

encrypted traffic analysis

Technologies Worth Introducing
Students entering the industry should know these.

Network tools

Wireshark

Zeek

Suricata

Nmap

Cloud security

AWS security groups

IAM policies

Security engineering

Hashicorp Vault

WireGuard

OpenSSL

Modern protocols

QUIC

DNSSEC

WebAuthn

New Topics Worth Brief Coverage
Even one lecture each will future-proof the course.

Post-Quantum Cryptography
Kyber, Dilithium, lattice crypto.

Zero Trust Networking
Identity instead of perimeter.

Supply Chain Security
SolarWinds, dependency attacks.

AI in Cybersecurity
AI malware, AI defense systems.

Encrypted Traffic Analysis
The future of monitoring.

One Change That Will Transform the Class
Replace one exam with a Red Team vs Blue Team exercise.

Students:

Red Team

attempt attacks

Blue Team

monitor and defend

Using tools like:

Security Onion

Zeek

Suricata

Students remember that exercise for years.

One Thing I Would NOT Remove
The crypto math.

Many courses drop it. That’s a mistake.

Students who understand:

finite fields

RSA math

ECC

are the ones who become real security engineers, not just tool users.

The old wisdom still matters.

If You Want, I Can Also Help With
I can help you quickly produce:

a modernized week-by-week schedule

6–8 hands-on labs

a VM / Docker security lab environment

a Red Team vs Blue Team exercise

a Post-Quantum cryptography lab

Given your background in RF, systems engineering, and real-world infrastructure work, the fun twist is this: your students could end the class understanding how real network security teams operate, not just how attacks work in theory.

That’s the difference between a good course and one students talk about years later.


Lets start with the week-by-week schedule (To be clear we have time.  I have 2 months until the class starts but I would like to be as well versed in everything as much as I can and I want the slides, homeworks, projects and tests ready to go at the start of the semester.)

A summer course is a strange beast. The calendar moves fast, but the students still need a coherent story. The best security courses follow a narrative arc: observe → understand → break → defend → modernize. That mirrors how real security engineers learn the craft.

Your current schedule jumps straight into DES and AES

. That was perfectly sensible twenty years ago, but today students see security first through breaches, monitoring dashboards, and cloud networks. Starting there hooks their attention before the mathematics shows up.

Below is a modernized 9-week schedule that keeps your core material but layers in modern practice and a lot more hands-on work.

Think of it as classic security theory wrapped in modern operational reality.

Proposed Summer Schedule — CS465/565 Network Security
Week 1 — Threat Modeling & Network Visibility
The first week should answer the question: What are we defending and how do we see attacks?

Topics

Modern threat landscape

Security models and attack surfaces

MITRE ATT&CK framework

Packet capture fundamentals

Network telemetry (NetFlow, logs)

Hands-on
Students capture traffic and identify protocols.

Tools

Wireshark

tcpdump

Zeek (intro)

Homework
Analyze a packet capture and identify suspicious activity.

Week 2 — Internet Protocol Weaknesses
Students learn that the Internet was not designed for security.

Topics

TCP/IP trust assumptions

ARP spoofing

DHCP attacks

DNS fundamentals

DNS cache poisoning

Hands-on
Students perform ARP spoofing in a controlled lab and observe traffic manipulation.

Project 1 assigned
Network traffic analysis.

Week 3 — Cryptography Foundations (Modern Context)
Now the math enters the story.

Topics

symmetric encryption

AES design overview

hash functions

password hashing

key derivation

Discussion
Why DES failed and how AES replaced it.

Hands-on
Students crack weak password hashes.

Homework
Hash attacks and rainbow tables.

Week 4 — Public Key Cryptography & Secure Protocols
This connects math to real protocols.

Topics

RSA

Diffie-Hellman

Elliptic Curve Cryptography

TLS handshake

certificates and PKI

Hands-on
Students inspect TLS sessions and certificate chains.

Project 1 due

Week 5 — Identity, Authentication & Password Attacks
Identity has become the core of modern security.

Topics

password attacks

credential stuffing

MFA

passkeys / WebAuthn

OAuth and OpenID Connect

Hands-on
Students attack a weak authentication system and implement stronger controls.

Midterm Review

Week 6 — Network Defense Systems
Now the course pivots from offense to defense.

Topics

firewalls

intrusion detection systems

anomaly detection

SIEM systems

log correlation

Hands-on
Deploy Suricata or Zeek to detect attacks.

Project 2 assigned
Intrusion detection project.

Week 7 — Cloud and Modern Infrastructure Security
Students must understand how security works in cloud networks.

Topics

cloud networking fundamentals

virtual private clouds

security groups

container networking

service meshes

Hands-on
Students secure a small cloud deployment.

Project 2 due

Week 8 — Modern Cyber Attacks
Students see how attackers operate today.

Topics

ransomware

supply chain attacks

botnets

DDoS

encrypted malware traffic

Hands-on
Analyze a simulated ransomware incident.

Project 3 assigned
Security architecture design.

Week 9 — Emerging Topics & Post-Quantum Cryptography
End the course by looking forward.

Topics

quantum computing threats

NIST post-quantum cryptography

lattice cryptography overview

zero trust architecture

AI in cybersecurity

Project 3 due
Final exam window.

Practical Projects
These anchor the course.

Project 1 — Network Traffic Investigation
Students analyze captured traffic and identify malicious activity.

Skills

packet analysis

protocol identification

anomaly detection

Project 2 — Intrusion Detection System
Students deploy and configure IDS software.

Skills

rule writing

alert analysis

false positive tuning

Project 3 — Secure Network Design
Students design a secure architecture for a fictional company.

Includes

network segmentation

authentication architecture

monitoring strategy

Graduate students add a research component.

Homework Ideas
Short assignments that reinforce lectures.

Examples

analyze TLS handshake packets

password cracking exercise

threat modeling case study

DNS attack analysis

firewall rule design

Suggested Lab Environment
You will save enormous time if you prepare a standard lab environment before the semester.

Ideal setup:

Student VM

Ubuntu

Wireshark

Zeek

Suricata

Nmap

Metasploit

John the Ripper

Hashcat

Instructor environment

simulated vulnerable network

attack traffic captures

A Docker-based lab works extremely well for this.

One Big Pedagogical Trick
Each week should answer one operational question:

Week 1
How do we see attacks?

Week 2
How do networks get exploited?

Week 3–4
How do we secure communication?

Week 5
How do we secure identity?

Week 6–7
How do we detect and defend?

Week 8
How do attackers operate today?

Week 9
What will break security next?

Students retain material much better when the course tells a story.

If you'd like, the next step I can help you with is something that saves a massive amount of prep time:

I can design a complete lab environment for the class (VM or Docker) so every project works out of the box.

Done right, it turns the course into a mini security operations center the students interact with all semester.


Can you put the above schedule into Markdown first so I can look at it offline.  And then we can work on the lab environment

Below is a clean Markdown version you can drop straight into Typora or your course repo. I kept the structure simple so it’s easy to modify as you iterate on the course.

\section{CS465/565 Network Security — Proposed Summer Schedule}

This schedule modernizes the course while preserving the traditional
foundations of cryptography and network security. The structure follows
a practical narrative:

observe → understand → break → defend → modernize.

Each week includes lecture topics and a hands-on activity.

---

\section{Week 1 — Threat Modeling and Network Visibility}

\textbf{Topics}

- Modern threat landscape
- Security models and attack surfaces
- MITRE ATT\&CK framework
- Packet capture fundamentals
- Network telemetry (NetFlow, logs)

\textbf{Hands-on}

Capture and analyze network traffic.

\textbf{Tools}

- Wireshark
- tcpdump
- Zeek (introduction)

\textbf{Homework}

Analyze a packet capture and identify suspicious activity.

---

\section{Week 2 — Internet Protocol Weaknesses}

\textbf{Topics}

- TCP/IP trust assumptions
- ARP spoofing
- DHCP attacks
- DNS fundamentals
- DNS cache poisoning

\textbf{Hands-on}

Perform ARP spoofing in a controlled lab and observe traffic manipulation.

\textbf{Project}

Project 1 assigned — Network traffic investigation.

---

\section{Week 3 — Cryptography Foundations}

\textbf{Topics}

- Symmetric encryption
- AES design overview
- Hash functions
- Password hashing
- Key derivation

\textbf{Discussion}

Why DES failed and how AES replaced it.

\textbf{Hands-on}

Crack weak password hashes.

\textbf{Homework}

Hash attacks and rainbow tables.

---

\section{Week 4 — Public Key Cryptography and Secure Protocols}

\textbf{Topics}

- RSA
- Diffie–Hellman
- Elliptic Curve Cryptography
- TLS handshake
- Certificates and PKI

\textbf{Hands-on}

Inspect TLS sessions and certificate chains.

\textbf{Project}

Project 1 due.

---

\section{Week 5 — Identity and Authentication}

\textbf{Topics}

- Password attacks
- Credential stuffing
- Multi-factor authentication
- Passkeys / WebAuthn
- OAuth and OpenID Connect

\textbf{Hands-on}

Attack a weak authentication system and implement stronger controls.

\textbf{Milestone}

Midterm review.

---

\section{Week 6 — Network Defense Systems}

\textbf{Topics}

- Firewalls
- Intrusion detection systems
- Anomaly detection
- SIEM systems
- Log correlation

\textbf{Hands-on}

Deploy Suricata or Zeek to detect attacks.

\textbf{Project}

Project 2 assigned — Intrusion detection deployment.

---

\section{Week 7 — Cloud and Modern Infrastructure Security}

\textbf{Topics}

- Cloud networking fundamentals
- Virtual private clouds
- Security groups
- Container networking
- Service meshes

\textbf{Hands-on}

Secure a small cloud deployment.

\textbf{Project}

Project 2 due.

---

\section{Week 8 — Modern Cyber Attacks}

\textbf{Topics}

- Ransomware
- Supply chain attacks
- Botnets
- Distributed denial of service (DDoS)
- Encrypted malware traffic

\textbf{Hands-on}

Analyze a simulated ransomware incident.

\textbf{Project}

Project 3 assigned — Secure network architecture design.

---

\section{Week 9 — Emerging Topics and Post-Quantum Cryptography}

\textbf{Topics}

- Quantum computing threats
- NIST post-quantum cryptography
- Lattice cryptography overview
- Zero trust architecture
- Artificial intelligence in cybersecurity

\textbf{Project}

Project 3 due.

\textbf{Assessment}

Final exam window.

---

\section{Projects}

\subsection{Project 1 — Network Traffic Investigation}

Students analyze captured traffic and identify malicious activity.

Skills developed:

- Packet analysis
- Protocol identification
- Traffic anomaly detection

---

\subsection{Project 2 — Intrusion Detection System}

Students deploy and configure an IDS.

Skills developed:

- Rule creation
- Alert analysis
- False positive reduction

---

\subsection{Project 3 — Secure Network Design}

Students design a secure architecture for a fictional company.

Includes:

- Network segmentation
- Authentication architecture
- Monitoring strategy

Graduate students add a research component.

---

\section{Homework Examples}

- TLS handshake analysis
- Password cracking exercise
- Threat modeling case study
- DNS attack analysis
- Firewall rule design

---

\section{Suggested Lab Tools}

Student VM should include:

- Ubuntu Linux
- Wireshark
- Zeek
- Suricata
- Nmap
- Metasploit
- John the Ripper
- Hashcat

Instructor environment should include:

- Simulated vulnerable network
- Attack traffic captures
  Now comes the part that will save you an absurd amount of teaching pain later: the lab environment architecture.

If we design it right, you get:

reproducible labs

minimal student setup issues

controlled attack environments

easy grading

reusable labs every semester

There are three viable architectures, but one is clearly the best for your situation. Next I’ll walk through the three approaches professors use for security labs, and which one will probably work best for your class.


I am pretty sure that is latex not markdown

You’re absolutely right. That was LaTeX-flavored structure, not true Markdown. Good catch. A good security engineer always checks the packet headers before trusting the payload.

Here’s the actual Markdown version, clean and compatible with Typora, GitHub, and most Markdown viewers.

# CS465/565 Network Security — Proposed Summer Schedule

This schedule modernizes the course while preserving the traditional
foundations of cryptography and network security.

The course follows a narrative progression:

**observe → understand → break → defend → modernize**

Each week includes lecture topics and a hands-on activity.

---

# Week 1 — Threat Modeling and Network Visibility

## Topics

- Modern threat landscape
- Security models and attack surfaces
- MITRE ATT&CK framework
- Packet capture fundamentals
- Network telemetry (NetFlow, logs)

## Hands-on

Capture and analyze network traffic.

## Tools

- Wireshark
- tcpdump
- Zeek (introduction)

## Homework

Analyze a packet capture and identify suspicious activity.

---

# Week 2 — Internet Protocol Weaknesses

## Topics

- TCP/IP trust assumptions
- ARP spoofing
- DHCP attacks
- DNS fundamentals
- DNS cache poisoning

## Hands-on

Perform ARP spoofing in a controlled lab and observe traffic manipulation.

## Project

**Project 1 Assigned — Network Traffic Investigation**

---

# Week 3 — Cryptography Foundations

## Topics

- Symmetric encryption
- AES design overview
- Hash functions
- Password hashing
- Key derivation

## Discussion

Why DES failed and how AES replaced it.

## Hands-on

Crack weak password hashes.

## Homework

Hash attacks and rainbow tables.

---

# Week 4 — Public Key Cryptography and Secure Protocols

## Topics

- RSA
- Diffie–Hellman
- Elliptic Curve Cryptography
- TLS handshake
- Certificates and PKI

## Hands-on

Inspect TLS sessions and certificate chains.

## Project

**Project 1 Due**

---

# Week 5 — Identity and Authentication

## Topics

- Password attacks
- Credential stuffing
- Multi-factor authentication
- Passkeys / WebAuthn
- OAuth and OpenID Connect

## Hands-on

Attack a weak authentication system and implement stronger controls.

## Milestone

**Midterm Review**

---

# Week 6 — Network Defense Systems

## Topics

- Firewalls
- Intrusion detection systems
- Anomaly detection
- SIEM systems
- Log correlation

## Hands-on

Deploy Suricata or Zeek to detect attacks.

## Project

**Project 2 Assigned — Intrusion Detection Deployment**

---

# Week 7 — Cloud and Modern Infrastructure Security

## Topics

- Cloud networking fundamentals
- Virtual private clouds
- Security groups
- Container networking
- Service meshes

## Hands-on

Secure a small cloud deployment.

## Project

**Project 2 Due**

---

# Week 8 — Modern Cyber Attacks

## Topics

- Ransomware
- Supply chain attacks
- Botnets
- Distributed denial of service (DDoS)
- Encrypted malware traffic

## Hands-on

Analyze a simulated ransomware incident.

## Project

**Project 3 Assigned — Secure Network Architecture Design**

---

# Week 9 — Emerging Topics and Post-Quantum Cryptography

## Topics

- Quantum computing threats
- NIST post-quantum cryptography
- Lattice cryptography overview
- Zero trust architecture
- Artificial intelligence in cybersecurity

## Project

**Project 3 Due**

## Assessment

Final exam window.

---

# Projects

## Project 1 — Network Traffic Investigation

Students analyze captured traffic and identify malicious activity.

Skills developed:

- packet analysis
- protocol identification
- traffic anomaly detection

---

## Project 2 — Intrusion Detection System

Students deploy and configure an IDS.

Skills developed:

- rule creation
- alert analysis
- false positive reduction

---

## Project 3 — Secure Network Design

Students design a secure architecture for a fictional company.

Includes:

- network segmentation
- authentication architecture
- monitoring strategy

Graduate students add a research component.

---

# Homework Examples

- TLS handshake analysis
- password cracking exercise
- threat modeling case study
- DNS attack analysis
- firewall rule design

---

# Suggested Lab Tools

Student VM should include:

- Ubuntu Linux
- Wireshark
- Zeek
- Suricata
- Nmap
- Metasploit
- John the Ripper
- Hashcat

Instructor environment should include:

- simulated vulnerable network
- attack traffic captures
  Now we can move to the lab environment, which is actually the most important engineering decision for the course.

There are three architectures professors typically use:

Single VM per student (classic approach)

Multi-VM attack/defense network

Docker cyber-range (modern approach)

One of these will save you dozens of hours of troubleshooting during the semester. The others… will generate office hours filled with “my VM won’t talk to the other VM.”

Next I’ll show you the architecture I would strongly recommend for your course and why it works so well.



academic_calendar_2025-2026_1 (1).pdf
PDF
Okay lets do the architecture.  By the calendar for summer is here if that helps any.


Thought for a few seconds
Yes — and the calendar helps a lot, because summer is not a normal semester. It is a compressed little goblin of a term. Your Summer 2026 session runs June 1 through July 31, with final exams August 3–4, plus university holidays on June 19 and July 3.

That means your lab architecture needs to optimize for three things:

fast startup

low student troubleshooting overhead

reusability across weekly labs

Given your existing syllabus emphasis on Linux, practical work, and weekly projects, I would recommend a Docker-based cyber range as the primary environment, with one prebuilt Linux VM as the fallback safety net. Your current course already expects students to use Linux systems and even recommends a Linux VM for network projects, so this is a natural evolution rather than a total course rewrite.


The recommendation in one sentence
Use one Ubuntu VM per student, but run the actual lab scenarios inside Docker Compose.

That gives you the control of a standard Linux environment and the reproducibility of containers.

That, in my opinion, is the sweet spot. Not too flimsy, not too baroque, not too likely to collapse into “Professor, my NAT adapter ate my DNS server.”

Recommended Architecture
Base Layer: one standard student VM
Each student gets a prebuilt Ubuntu VM image.

This VM contains:

Docker and Docker Compose

Wireshark

tcpdump

Zeek

Suricata

Nmap

John the Ripper

Hashcat

Python

Git

VS Code or basic editor tools

course lab repo pre-cloned

Why this matters:

everyone starts from the same environment

you avoid Windows/macOS weirdness

students can still use normal Linux tools directly

Docker runs the scenarios cleanly inside the VM

This preserves the old-school “everyone has a known lab machine” model, which is still the sanest way to teach security.

Scenario Layer: Docker Compose cyber-range
Inside the VM, each lab spins up a small isolated network using Docker Compose.

For example, a lab might include:

client

web

dns

attacker

ids

logger

Students run something like:

docker compose up -d
Then they attack, monitor, analyze, or harden that miniature environment.

Why this is better than multiple full VMs:

much faster startup

less RAM usage

easier resets

easier grading

easier for you to patch once and redistribute

simpler to script

This is the modern version of the old multi-VM VirtualBox lab, except without so much sorrow and spontaneous combustion.

Fallback Layer: offline packet captures and snapshots
For every lab, provide:

a working scenario

a packet capture (.pcap)

logs

a screenshot or expected output

a reset script

That way, if Docker breaks for a student, they can still complete the analysis portion and not lose the week.

This is pedagogically important. In summer terms, one broken environment can sink a student for half the course.

Why I recommend this over the alternatives
Option 1: Single VM only
This is the classic professor move.

Students do everything directly in one Linux VM.

Pros
simple conceptually

easy to explain

works offline

Cons
students can wreck the environment

resetting labs is messy

services interfere with each other across weeks

reproducibility is weaker

This works, but over a fast 10-week term it becomes a maintenance swamp.

Option 2: Full multi-VM network
This is the “real cyber range” approach.

Students run several VMs:

attacker VM

victim VM

firewall VM

IDS VM

maybe a SIEM VM

Pros
very realistic

great for advanced courses

excellent for capstone exercises

Cons
huge RAM and CPU requirements

painful networking setup

student laptops will cry in several dialects

too much environment debugging for a summer course

I would not make this your default for CS465/565 unless you want office hours to become a support desk for VirtualBox adapters.

Option 3: Docker-only on student host
Students install Docker on their own Windows/macOS/Linux systems and run labs directly.

Pros
lightweight

modern

portable

Cons
host OS differences become your problem

packet capture can get awkward

networking behavior varies

Windows and macOS inject chaos

For professional teams, this can be fine. For a mixed student population in a compressed summer term, it is riskier than I like.

The architecture I would use
Student setup
Each student downloads:

one Ubuntu VM image

one Git repo containing all labs

one short setup guide

Inside the VM:

Docker runs each scenario

Wireshark/tcpdump/Zeek/Suricata observe traffic

assignments are submitted from generated artifacts

Instructor setup
You maintain:

one golden VM

one lab repo

one answer-key repo

one folder of packet captures and clean solutions

That means before the semester starts, your real prep work is:

build the golden VM once

build 6–8 Docker lab scenarios

test them end to end

export the VM

freeze the tooling versions

That is exactly the kind of up-front labor that saves your sanity later.

Best fit for your 10-week summer calendar
Because Summer 2026 runs only from June 1 to July 31 with holidays breaking the rhythm in the middle, I would structure the labs in three tiers.


Tier 1: fast labs
These fit in one class period or one homework cycle.

Examples:

packet capture analysis

ARP spoofing observation

password hash cracking

TLS certificate inspection

Tier 2: medium labs
These take about a week.

Examples:

DNS poisoning and mitigation

Zeek/Suricata detection lab

firewall rule design and validation

Tier 3: larger projects
These run over 1–2 weeks.

Examples:

intrusion detection deployment

secure network design

final red-team / blue-team style exercise

That pacing fits your compressed term better than trying to make every week a giant build.

Concrete environment layout
Here is the exact shape I would use.

VM
Ubuntu 24.04 LTS or 22.04 LTS
I would lean 22.04 LTS if you want maximum tool stability and fewer package surprises.

Installed packages:

docker.io / docker-ce

docker compose plugin

wireshark

tcpdump

tshark

zeek

suricata

nmap

john

hashcat

curl

openssl

python3

git

jq

Course repo structure
network-security-course/
README.md
setup/
student-quickstart.md
reset-vm.sh
labs/
lab01-traffic-analysis/
lab02-arp-dns/
lab03-passwords-hashes/
lab04-tls-pki/
lab05-authentication/
lab06-ids/
lab07-cloud-network-security/
lab08-ransomware-analysis/
lab09-pqc-intro/
pcaps/
starter-configs/
rubrics/
solutions/
Per-lab structure
lab06-ids/
README.md
docker-compose.yml
configs/
pcaps/
logs/
scripts/
deliverables/
That makes each lab self-contained and resettable.

Example lab topology
For a DNS / ARP / traffic analysis week:

student-vm
└── docker compose network
├── client
├── webserver
├── dns
├── attacker
└── ids
Students can:

generate traffic from client

inspect captures on the VM

run the attacker container

inspect Zeek or Suricata alerts

harden configs and retest

That is real practice, not just “please admire this PowerPoint about spoofing.”

What this enables pedagogically
This architecture lets you teach security as a discipline of:

visibility

misconfiguration

attack execution

detection

mitigation

verification

That is much closer to real network security practice than a course that lives mostly in abstract crypto-land.

You still keep the math and theory from your current syllabus, but now students also learn what defenders actually do with packets, logs, certificates, alerts, and access controls. That’s a worthy upgrade from the existing structure.


My strong recommendation
If this were my course, I would do this:

Primary environment: prebuilt Ubuntu VM
Lab engine: Docker Compose
Observation tools: Wireshark, Zeek, Suricata
Fallback: packet captures and logs for every lab
Final project: a small attack/detect/defend exercise inside the same environment

That is the best balance of realism, control, and survivability.

What I would build first in the next two months
In order:

the golden VM

the lab repo skeleton

Lab 1 and Lab 2

a reset/check script

the grading rubrics

the remaining labs

the final project scenario

Do that, and by the time June arrives, you are not improvising under fire like a raccoon with a firewall.

Next, I’d recommend we design the golden VM contents and the 6–9 lab modules in concrete detail so you can start building them in the right order.


Okay new plan.  I was just informed I am not teaching Network Security this Summer but rather       CS 453/553 Client/Server Architectures "Client/server distributed computing. Web based applications. Students will practice concepts in programs involving leading edge technologies such as AJAX, RESTful and WS-* web services. Enterprise Java Beans, .Net. CS 370 is recommended."  Should I start a new chat or continue with this one

No need to start a new chat. Conversations are just threads of thought, not sacred scrolls that must never change topic. The universe happily pivots all the time—stars collapse, galaxies collide, and apparently professors get reassigned to different courses. We can pivot too.

Continuing here is actually useful because I already have a good picture of how you design courses and what tools you like to use. That context helps a lot when building a new syllabus.

Now, CS 453/553 Client/Server Architectures is a very different beast from Network Security, but it’s a fun one. It sits right at the intersection of:

distributed systems

web architecture

APIs and services

modern application infrastructure

The catalog description mentions things like AJAX, REST, WS- services, EJB, .NET*. That wording smells like it was written sometime around the early Obama administration. The spirit is still right, but the technologies students actually encounter today look a bit different.

If I were modernizing that course while still respecting the catalog language, I would frame it around the evolution of client/server systems:

classic client/server

web applications

REST APIs

microservices

cloud-native architectures

modern front-end clients

In practical terms, students today should leave that course understanding things like:

HTTP as an application protocol

REST API design

authentication (OAuth, JWT)

asynchronous communication

WebSockets

microservices and service discovery

containerized deployment

API gateways

frontend/backend separation

In other words: how modern distributed web systems are actually built.

The nice thing is that your background with NestJS, TypeORM, APIs, and cloud tooling means you already live in this world professionally. That makes the course far easier to build than Network Security labs.

Before we start designing the schedule, there are three decisions that will shape the whole course:

First, what language stack do you want students using?
Common options would be Node/TypeScript, Java/Spring, Python/FastAPI, or .NET.

Second, do you want a single semester-long project (which works well for architecture courses) or multiple smaller assignments?

Third, how modern do you want to go? For example, do you want to include things like:

GraphQL

WebSockets

container deployment

microservices

or keep it closer to traditional client/server concepts?

My instinct—knowing you’re a software engineer and like practical material—is that the course should culminate in students building a distributed web application with multiple services and a client. That teaches architecture in a way lectures never can.

If you’d like, the next thing we can do is sketch a week-by-week schedule for CS 453/553 similar to what we did for Network Security, but aligned with modern web architectures. That will quickly reveal what labs, projects, and tooling the course should revolve around.



UAH CS 453_552 Syllabus Summer 2023.docx.md
File
It is.  My PhD advisor wrote the textbook in like 2012 or something.  She told me when I first taught it to update it.  Above is my sillabus from 2023.  I tried to focus on APIs, REST, and such things without it becoming a class on cloud development.  However, I would like to plan it better this time and talk about current things websockets, graphql, anything that makes sense.  I am partial to typescript but I can be flexible and allow python and whatnot if thats better for the students. I have technically worked in all of those (.NET is a hate/hate relationship so )

The good news is your 2023 syllabus already had the right instinct. You pushed toward REST, APIs, and practical middleware instead of staying stuck in CORBA-land. That was a wise move. But looking at the schedule, the course is still chained to a historical taxonomy of middleware: CORBA, EJB, WCF, JAX-WS, etc.


Those technologies matter historically, but today they are better taught as evolutionary stages, not equal pillars. Modern client/server architecture has converged around a few dominant ideas:

HTTP as the universal application protocol

REST APIs and resource models

asynchronous messaging

real-time communication (WebSockets, streaming)

service decomposition (microservices)

API contracts (OpenAPI / GraphQL schemas)

containerized deployment

If the course is about client/server architectures, then the real story we want students to understand is:

how distributed web systems evolved.

Think of the course as telling this engineering narrative:

Sockets → HTTP → REST → Service Architectures → Real-time Systems → Modern APIs
That keeps the catalog description satisfied while making the material feel modern.

One Important Design Choice
Before writing the schedule, there’s one decision that will shape the entire class.

I strongly recommend:

One language for the server. Multiple allowed for the client.

Server options you could support:

Primary stack (recommended):

TypeScript + Node + Express/NestJS

Alternative student option:

Python + FastAPI

Reasons:

Both are lightweight.

Both are extremely good for teaching APIs.

Both avoid the Java build-tool nightmare for a summer class.

Students can move quickly.

You can let students pick either, but all examples should use one canonical stack so your lectures stay coherent.

Personally I’d lean TypeScript because:

strongly typed APIs are easier to reason about

the ecosystem is huge

JSON tooling is excellent

But supporting Python is reasonable since many students know it.

Your instinct to avoid turning the class into “AWS deployment bootcamp” is also correct. Architecture should be about design principles, not cloud vendor syntax.

What the Course Should Teach Conceptually
Students finishing CS453 should understand these ideas:

core network interaction
sockets

request/response

HTTP semantics

web architecture
REST

statelessness

resource modeling

API design
URI design

versioning

OpenAPI

middleware patterns
API gateways

service discovery

message brokers

modern distributed systems
microservices

event-driven systems

streaming APIs

WebSockets

security basics
authentication

authorization

API security

Not in depth like your network security course, but enough so they don’t build catastrophes.

A Better Course Narrative
The course should progress like this:

Week 1–2
Foundations of client/server communication

Week 3–4
Building HTTP APIs

Week 5–6
Service architectures and middleware

Week 7
Real-time and event-driven systems

Week 8
Modern API styles

Week 9
Architecture case studies

Proposed Modern Schedule (9-Week Summer)
Here’s a structure that keeps the intellectual story coherent.

Week 1 — Foundations of Client/Server Systems
Topics

history of distributed systems

sockets and RPC

request/response model

stateless vs stateful systems

layered architectures

Practical

Simple TCP socket client/server.

Week 2 — HTTP and the Web Architecture
Topics

HTTP protocol

headers and status codes

cookies and sessions

JSON vs XML

serialization formats

Practical

Build a simple HTTP server.

Week 3 — REST API Design
Topics

REST constraints

resources and representations

URI design

HTTP verbs

idempotency

Practical

Build a REST API.

Week 4 — Middleware and Service Architectures
Topics

middleware concept

service oriented architecture

API gateways

service discovery

load balancing

Practical

Multi-service architecture.

Project 1 due.

Week 5 — Authentication and API Security
Topics

authentication vs authorization

sessions vs tokens

JWT

OAuth concepts

API security risks

Midterm.

Week 6 — Messaging and Asynchronous Systems
Topics

message brokers

publish/subscribe

queues

event-driven architecture

Examples

RabbitMQ

Kafka

Practical

Async messaging between services.

Week 7 — Real-Time Communication
Topics

WebSockets

streaming APIs

server-sent events

polling vs push

Practical

Real-time client/server app.

Week 8 — Modern API Styles
Topics

GraphQL

API versioning

schema design

API documentation (OpenAPI)

Practical

Expose same data via REST and GraphQL.

Project 2 due.

Week 9 — Modern Architectures
Topics

microservices

containers

service meshes

observability

Architecture case studies:

Netflix

Uber

Spotify

Final.

Projects
Instead of disconnected assignments, I recommend one evolving system.

Students build a distributed application in stages.

Project 1
REST API server.

Project 2
multi-service architecture.

Project 3 (grad students)
event-driven or GraphQL extension.

Why This Structure Works
Students learn architecture by evolution, not by memorizing middleware names.

They see:

socket server
→ HTTP server
→ REST API
→ multi-service architecture
→ real-time system
→ modern API design
That progression mirrors the actual evolution of distributed computing over the last 30 years.

The One Thing I Would Remove
I would no longer teach:

CORBA

WCF

.NET Remoting

EJB internals

Instead, give them one lecture on middleware history so they understand how we got here.

Those technologies are fossils now.

If this were my course
The final project would be:

Build a distributed web application with

REST API

real-time updates

authentication

multiple services

API documentation

That forces students to actually design a system.

If you want, the next thing I’d recommend doing is something professors rarely do but that makes the course dramatically smoother:

Design the semester project first.

Once the project architecture exists, the weekly lectures almost write themselves.


CAn you give me a markdown of the schedule above

Here is the clean Markdown version of the proposed schedule so you can drop it straight into Typora, GitHub, or your course repo.

I kept it simple and readable so you can easily edit it as the course evolves.

# CS 453 / 553 — Client/Server Architectures
## Proposed Summer Course Schedule

This course explores the design and implementation of distributed client/server systems.  
The course follows the evolution of modern web architectures:

Sockets → HTTP → REST → Service Architectures → Real-time Systems → Modern APIs

Students will incrementally build a distributed application throughout the semester.

---

# Week 1 — Foundations of Client/Server Systems

## Topics

- History of distributed computing
- Client/server vs monolithic systems
- Sockets and remote communication
- Request/response model
- Stateless vs stateful systems
- Layered architecture

## Practical

Implement a simple TCP socket client and server.

---

# Week 2 — HTTP and Web Architecture

## Topics

- HTTP protocol structure
- Request and response lifecycle
- HTTP headers and status codes
- Cookies and sessions
- JSON vs XML
- Serialization formats

## Practical

Build a basic HTTP service that returns structured data.

---

# Week 3 — REST API Design

## Topics

- REST architectural constraints
- Resources and representations
- URI design
- HTTP verbs and semantics
- Idempotency and safe operations

## Practical

Implement a REST API with multiple endpoints.

---

# Week 4 — Middleware and Service Architectures

## Topics

- Role of middleware
- Service-oriented architecture (SOA)
- API gateways
- Service discovery
- Load balancing concepts

## Practical

Build a small multi-service system.

## Milestone

Project 1 Due

---

# Week 5 — Authentication and API Security

## Topics

- Authentication vs authorization
- Session-based authentication
- Token-based authentication
- JSON Web Tokens (JWT)
- OAuth concepts
- Common API security risks

## Assessment

Midterm Exam

---

# Week 6 — Messaging and Asynchronous Systems

## Topics

- Synchronous vs asynchronous communication
- Message brokers
- Publish/subscribe systems
- Event-driven architectures
- Queue-based communication

## Technologies Discussed

- RabbitMQ
- Kafka

## Practical

Implement asynchronous communication between services.

---

# Week 7 — Real-Time Communication

## Topics

- WebSockets
- Streaming APIs
- Server-Sent Events
- Polling vs push communication models
- Designing real-time systems

## Practical

Implement a real-time client/server application using WebSockets.

---

# Week 8 — Modern API Styles

## Topics

- GraphQL fundamentals
- API versioning strategies
- Schema design
- API documentation
- OpenAPI / Swagger

## Practical

Expose the same service using REST and GraphQL.

## Milestone

Project 2 Due

---

# Week 9 — Modern Distributed Architectures

## Topics

- Microservices architecture
- Containerization concepts
- Service meshes
- Observability and monitoring

## Architecture Case Studies

- Netflix
- Uber
- Spotify

## Assessment

Final Exam

---

# Projects

## Project 1 — REST API Server

Students design and implement a RESTful API service.

Concepts reinforced:

- HTTP fundamentals
- REST design
- endpoint implementation

---

## Project 2 — Multi-Service Architecture

Students extend their API into a distributed multi-service system.

Concepts reinforced:

- service decomposition
- internal service communication
- architecture design

---

## Project 3 (Graduate Students Only)

Graduate students extend the architecture with advanced capabilities such as:

- event-driven communication
- GraphQL API layer
- real-time features
  One thing worth saying as a fellow builder of software systems: this course has a huge opportunity to be fun because architecture classes get dull fast if they’re just taxonomy.

If you structure it so students are building one evolving system (socket → HTTP → REST → distributed → realtime → GraphQL), they suddenly see the why behind each technology instead of memorizing buzzwords.

Next, if you want, we can design something that will make this course ridiculously smooth to run:

the semester project architecture

the recommended tech stack

the repo structure students start from

Getting that right will save you an enormous amount of grading pain later.


Sounds good lets get started on the semester project architecture and we can build out the other two as we go. Two things I would like to touch on as far as the tech stack.  From teaching Senior Design I know most of these students have no knowledge when it comes to Database usage/integration and Authentication (something like Oauth2.0 or similar).

That is extremely useful, because it tells us the course should not assume students already know two things that modern client/server systems absolutely depend on:

persistent data

identity / access control

So the semester project should be designed to teach those gently, not treat them like background knowledge. Otherwise you get the classic academic tragedy: “build a distributed architecture” turning into “copy random JWT blog post, panic, and hardcode passwords into source control like tiny goblins.”

My recommendation
Build the entire course around one evolving full-stack system with these layers:

client

API server

database

authentication

optional advanced extensions

That gives you a backbone for the whole semester.

The trick is to make the architecture:

simple enough for undergrads

extensible enough for grad students

modern enough to feel current

not so large that you become unpaid tech support

Recommended semester project concept
I would use a project like this:

Team Task / Issue Tracking Platform

Think “lightweight Trello / helpdesk / project board.”

Why this works:

easy for students to understand

naturally supports CRUD

needs a database

benefits from authentication

supports real-time updates

can be extended with GraphQL, WebSockets, async messaging

It also avoids weird domain complexity. Nobody needs to first understand medicine, banking, or supply chain logistics just to learn middleware.

Core entities
Start with a small, sane data model:

User

Project or Workspace

Task

Comment

Status / Label

That is enough to teach relationships, ownership, authorization, and API design.

Architecture progression
The semester project should evolve in stages that match the course schedule.

Stage 1 — Basic client/server communication
Students implement a very small client and server interaction first.

Could be:

CLI client + TCP socket server, or

tiny browser client + simple HTTP server

This teaches communication basics before frameworks do all the magic.

Stage 2 — HTTP API
Students build a REST API for the task system.

Endpoints like:

GET /projects

GET /tasks

POST /tasks

PATCH /tasks/:id

DELETE /tasks/:id

This is where they learn:

routing

request/response lifecycle

JSON payloads

validation

HTTP status codes

Stage 3 — Database integration
Now the API gets a real database.

Students learn:

schema design

tables / collections

foreign keys or references

querying

persistence vs in-memory state

This is a major teaching opportunity because, as you said, many of them probably have basically no database instincts yet.

Stage 4 — Authentication and authorization
Add login and protected routes.

Students learn:

user registration

password hashing

login flow

bearer tokens or sessions

role-based access basics

ownership checks

This is the point where architecture starts feeling like real software engineering instead of toy endpoints.

Stage 5 — Multi-service split
Split the app into two or more services.

For example:

API service

auth service

notification service

Now you can discuss:

service boundaries

internal vs external APIs

why decomposition helps or hurts

failure points in distributed systems

Stage 6 — Real-time features
Add WebSockets.

Examples:

live task updates

comment notifications

“user is viewing board”

project activity feed

This makes the class feel modern fast.

Stage 7 — Modern API extension
Graduate students or stronger undergrads can add:

GraphQL endpoint

event queue

OpenAPI docs

rate limiting

caching

That gives you a graceful path for differentiated difficulty.

Best stack choice
Given your preferences and the student population, here is my strong opinion.

Best default stack
TypeScript + Node.js + Express or NestJS + PostgreSQL

Why TypeScript
good industry relevance

strong typing helps students catch nonsense early

natural fit for APIs and JSON

strong support for WebSockets and GraphQL

aligns with your own experience

Why PostgreSQL
students need real relational database exposure

teaches schema design properly

much better educationally than hiding everything behind document blobs

forces them to think about relationships and constraints

Why not MongoDB as the default
Mongo makes beginner CRUD look easy, but it quietly lets students dodge data modeling discipline. For a client/server architecture course, I’d rather they learn tables, keys, joins, and integrity. Old-school database fundamentals still matter. The relational model remains stubbornly alive because reality keeps being relational.

Why not Java as the default
Java/Spring is powerful, but for a compressed summer class it adds more framework weight than you need unless your goal is enterprise Java specifically.

Why not .NET
You already answered that with “hate/hate relationship,” which I consider a perfectly respectable architectural constraint.

Secondary allowed stack
Let students optionally use:

Python + FastAPI + PostgreSQL

This is a nice alternative for students who are much more comfortable in Python.

My recommendation would be:

all lectures and starter templates in TypeScript

Python allowed for projects with the same API requirements

That keeps your teaching coherent without forcing every student into one exact mold.

Authentication choice
Since students are weak on auth, I would not start with full OAuth 2.0 integration as the base requirement.

That way lies semester derailment.

Instead:

Base requirement
Teach:

registration

login

password hashing with bcrypt/argon2

JWT access token

role/ownership checks

This gives them the conceptual foundation.

Then discuss OAuth 2.0 conceptually
Explain:

resource owner

client

authorization server

access token

refresh token

But make full OAuth integration an advanced option, not the default project requirement.

Why? Because if students do not understand basic auth first, OAuth becomes ceremony without comprehension.

A very sane progression is:

local username/password auth

protected API routes

role-based access

explain OAuth and OIDC

optional “login with Google/GitHub” extension

That teaches the ladder in the right order.

Database teaching strategy
Since they’re weak on databases, I’d make persistence an explicit learning goal rather than just infrastructure.

You want them to learn:

how to model entities

one-to-many relationships

many-to-many relationships

primary and foreign keys

constraints

migration basics

why validation belongs in multiple layers

For the task app, the schema stays manageable.

Example:

users

projects

tasks

comments

project_members

That is rich enough to teach architecture, but not so huge it becomes a DBA course.

Suggested repo architecture
I’d start students with a monorepo. It keeps life simpler.

client-server-architecture-project/
apps/
web-client/
api-server/
auth-service/        # optional later split
notification-service/ # optional later split
packages/
shared-types/
docs/
database/
schema/
migrations/
seed/
scripts/
README.md
That supports growth without immediately dumping them into microservice chaos.

Semester project milestones
Here is the structure I’d use.

Milestone 1 — Basic API and persistence
Students build:

simple REST API

PostgreSQL schema

CRUD for tasks/projects

validation

basic client

Deliverable:
working single-service app

Milestone 2 — Auth and protected resources
Students add:

user accounts

hashed passwords

login

JWT auth

ownership/authorization checks

Deliverable:
authenticated multi-user system

Milestone 3 — Architecture extension
Students add one or more:

WebSockets

GraphQL

second service

async notifications

better documentation

admin/reporting features

Deliverable:
modern distributed system extension

Graduate requirement
CS 553 students should add a design/report component and one advanced architectural feature such as:

GraphQL gateway

message broker

event-driven workflow

service decomposition analysis

performance comparison of REST vs GraphQL or polling vs WebSockets

That creates a proper graduate distinction without making the whole course miserable.

What I would teach explicitly early
Because of the student gaps you mentioned, I would make sure Weeks 2–5 directly teach these practical foundations:

request validation

DTOs / schemas

relational data modeling

migrations

hashing passwords

auth middleware / guards

protected routes

ownership checks

Those are not side topics. They are central architecture topics.

My recommendation in one sentence
Use a task/project tracking web application built in TypeScript + Node + PostgreSQL, with basic JWT auth as the base requirement, and make WebSockets / GraphQL / service decomposition the later architectural extensions.

That gives you a course project with enough depth to teach real client/server architecture while still being survivable for students.

Next, I’d build the project into a concrete milestone plan with exact features per phase, because that will drive the lectures, assignments, and grading rubrics like a well-behaved little distributed system.


Does it make sense to use my normal github account or the UAH-Computer-Science org I created a while back (didn't every really use it though).  I think its though the github educators thing.

Use the UAH-Computer-Science organization. Not even close. Let me explain why, because this is one of those infrastructure decisions that seems trivial now and becomes annoying later if you pick wrong.

A course repo ecosystem is a little distributed system of its own: identity, access control, lifecycle, auditing. Personal accounts work for hobby projects. Courses benefit from institutional boundaries.

Why the organization is the better architecture
1. Ownership survives you
   If everything lives under your personal GitHub account, then:

repos technically belong to you

students depend on your account

the course infrastructure disappears if you change institutions or accounts

If it lives under UAH-Computer-Science, the repos are institutional assets.

Think of it like the difference between:

/home/dan/course
versus

/opt/university/course
One is personal. One is infrastructure.

Universities appreciate the latter.

2. GitHub Classroom integration works better
   Since you mentioned the GitHub Education setup, the organization is exactly what GitHub Classroom expects.

Benefits:

auto-provisioned student repos

assignment templates

grading workflows

per-student private repos

automatic access control

That eliminates the “email me a zip file” academic dark age.

3. Clean separation of course material
   You will likely end up with multiple repos:

client-server-course
client-server-labs
client-server-project-template
client-server-solutions
client-server-instructor-notes
Putting those under an org keeps them logically grouped.

Students see:

github.com/UAH-Computer-Science/client-server-project
instead of

github.com/dr-code-monkey/client-server-project
That subtly signals “this is a course artifact,” not a random GitHub project.

4. Student access management is easier
   With an organization you can use:

teams

repository permissions

private repos

read-only release material

Example structure:

UAH-Computer-Science
├── cs453-course-material
├── cs453-project-template
├── cs453-labs
├── cs453-solutions (private)
Students only see what they should see.

5. It scales if you reuse the course
   You may teach this again later.

Then the org becomes a nice archive:

UAH-Computer-Science
├── cs453-summer2025
├── cs453-summer2026
├── cs453-spring2027
You can branch or fork course versions cleanly.

6. GitHub Education perks apply automatically
   Organizations created through the educator program get things like:

GitHub Classroom

increased private repo limits

CI minutes

Codespaces for students

Those features don’t always attach cleanly to personal accounts.

One practical setup I recommend
Inside your org, create something like:

UAH-Computer-Science
│
├── cs453-client-server
│     course slides
│     syllabus
│     lecture examples
│
├── cs453-project-template
│     starter code students fork
│
├── cs453-labs
│     smaller exercises
│
└── cs453-instructor
solutions
grading scripts
exam questions
Make the instructor repo private.

One small but important tip
Create one template repo for the semester project.

Then each student gets their own repo generated from it using GitHub Classroom.

That way:

they all start from identical architecture

you avoid “my folder structure is different” chaos

you can easily grade and run their projects

One opinionated professor take
Avoid letting students submit:

zip files

screenshots

PDFs of code

“here’s a Google Drive link”

A client/server architecture course should be 100% repository-driven. Version control is part of architecture literacy now.

My recommendation in plain language
Use:

UAH-Computer-Science GitHub organization + GitHub Classroom + template repos.

Keep your personal GitHub account out of the operational side of the course.

It’s the cleanest architecture.

If you want, the next thing I’d suggest designing (before writing a single line of starter code) is the project template repo structure.

Getting that right will make the semester project dramatically easier for both you and the students.


I submitted my application for github education so that might take a minute but we can continue on while we wait.

Perfect. Waiting on GitHub Education approval is normal—it sometimes takes a day or two. The important thing is you’ve already made the right move. Meanwhile we can design everything so that when the approval lands you just drop it into place like a well-engineered system coming online.

Think of what we’re doing now as architecture before implementation, which is exactly what your course is supposed to teach.

Right now the most important artifact to design is the project template repository. If that template is solid, everything else—assignments, grading, and student experience—gets dramatically easier.

Step 1 — What the project template must accomplish
The template needs to satisfy several constraints simultaneously.

Students must be able to:

run the system quickly

understand the structure

extend the system gradually

not drown in tooling

You must be able to:

grade it easily

run it locally

understand their architecture

enforce consistent structure

So the template should provide:

working API server

working database connection

simple frontend or client

clean project structure

basic build scripts

starter documentation

Not a giant framework cathedral—just enough scaffolding to prevent chaos.

Step 2 — Recommended technology stack
Based on your preferences and the course goals:

Server:

Node.js + TypeScript

Express (simple) or NestJS (more structured)

Database:

PostgreSQL

ORM:

Prisma or TypeORM
(Prisma is easier for students)

Authentication later:

JWT

Realtime later:

WebSockets

Optional later:

GraphQL

Students who want Python could replicate the architecture using FastAPI, but the starter template should stay TypeScript so lectures remain coherent.

Step 3 — Template repository structure
Here is the structure I recommend.

cs453-project-template
│
├── README.md
├── docker-compose.yml
├── .env.example
│
├── docs
│   └── architecture.md
│
├── apps
│   ├── api
│   │   ├── src
│   │   │   ├── controllers
│   │   │   ├── services
│   │   │   ├── models
│   │   │   ├── routes
│   │   │   └── server.ts
│   │   │
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── client
│       ├── index.html
│       ├── app.js
│       └── styles.css
│
├── database
│   ├── schema
│   │   └── schema.prisma
│   │
│   ├── migrations
│   └── seed.ts
│
└── scripts
├── dev.sh
└── reset-db.sh
The key idea is that the project is layered clearly:

client
API
database
documentation

That mirrors real architecture.

Step 4 — Docker or not?
I strongly recommend Docker for the database only, not the entire stack.

Students run the server locally but the DB via Docker.

Example:

docker-compose up -d
That launches PostgreSQL.

Benefits:

identical database for everyone

no install problems

reproducible environment

easy resets

Avoid putting the entire application in Docker for this course. That creates more confusion than educational value.

Step 5 — Minimal initial API
The starter server should expose something trivial like:

GET /health
GET /tasks
POST /tasks
Tasks stored in PostgreSQL.

Example response:

{
"id": 1,
"title": "Finish homework",
"status": "open"
}
This is just enough to demonstrate:

routing

database queries

JSON responses

Students extend it later.

Step 6 — Initial database schema
Keep the first schema tiny.

User
Task
Project
Example relationships:

User
id
email
password_hash

Project
id
name
owner_id

Task
id
title
project_id
assigned_user_id
status
Students learn:

foreign keys

ownership

multi-user systems

Step 7 — Architecture documentation
The template should include a simple diagram explaining the system.

Example conceptual architecture:

Browser Client
|
v
REST API
|
v
PostgreSQL
Later weeks add:

Browser Client
|
v
API Gateway
/     \
Auth API  Task API
|
v
PostgreSQL
Students see the architecture evolve.

Step 8 — Project milestone progression
The template is intentionally incomplete.

Students must extend it.

Milestone 1
Basic CRUD API

Milestone 2
Authentication

Milestone 3
Service architecture extension

Graduate students add advanced architecture.

Step 9 — Grading becomes much easier
Because every student repo has the same structure you can run:

npm install
npm run dev
And test endpoints easily.

That saves enormous time.

One philosophical teaching point
Architecture courses should not be about memorizing technologies.

They should be about understanding why architectures evolve.

Students should see the progression:

single server
→ API server
→ authenticated API
→ service decomposition
→ real-time systems
→ modern API paradigms
Your semester project becomes the living example of that evolution.

Next step I recommend
The next thing we should design is the exact milestone specifications for the semester project.

This matters because each milestone will directly drive:

lectures

homework

grading rubric

repository structure

If we do that carefully, the course basically runs itself.

And I promise there’s one small trick professors use in architecture courses that makes students actually learn distributed design instead of just hacking code.


Uploaded image
Okay I fixed all my linux issues in the other chat so lets get back to this.  Created the 4 repos

That’s a solid setup. Nicely done. The repo names are clean, readable, and boring in exactly the right way—the highest compliment infrastructure can receive.

You now have the skeleton of the course:

cs453-client-server for course materials

cs453-project-template for the semester project starter

cs453-labs for smaller exercises

cs453-instructor as the private vault of forbidden knowledge

That is the right architecture.

A couple of tweaks I’d make right now
Before you go much further, I’d suggest two small moves.

First, make sure cs453-project-template is actually marked as a template repository in GitHub settings. Otherwise students will fork it in odd ways and GitHub Classroom will be less happy.

Second, once GitHub Education/Classroom is ready, I would probably make student-facing repos private by default for submissions, even if the starter repos stay public. Public starter code is fine. Public student submissions are usually less fine, for the usual goblin reasons.

What to put in each repo next
Here is the sane next step.

cs453-client-server
This should hold:

syllabus

schedule

lecture slides

reading list

assignment handouts

general setup docs

Suggested top-level structure:

cs453-client-server/
README.md
syllabus/
schedule/
slides/
assignments/
examples/
policies/
cs453-project-template
This is the most important one right now. It should become the starter skeleton for the semester project.

Suggested structure:

cs453-project-template/
README.md
.gitignore
.env.example
docker-compose.yml
docs/
architecture.md
apps/
api/
client/
database/
schema/
migrations/
seed/
scripts/
cs453-labs
Use this for smaller, self-contained weekly exercises.

Suggested structure:

cs453-labs/
README.md
lab01-sockets/
lab02-http/
lab03-rest/
lab04-db/
lab05-auth/
lab06-websockets/
lab07-graphql/
cs453-instructor
Keep this private and treat it like a loaded nail gun.

Suggested structure:

cs453-instructor/
README.md
solutions/
rubrics/
exam-bank/
notes/
grading-scripts/
answer-keys/
My recommendation for the next concrete task
The very next thing to build is the cs453-project-template README and folder skeleton.

Not the full code yet. Just the skeleton.

Why? Because once the template structure exists, all of your later course decisions become easier:

milestone specs map to folders

starter code has a home

slides can reference the actual structure

grading expectations become concrete

What the project template should become
I still think your best semester-long project is a task/project tracking system with:

REST API

PostgreSQL

authentication

real-time updates later

optional GraphQL later

That project naturally teaches the two weak areas you mentioned:

database usage/integration

authentication

And it does so in a way that feels like real software, not toy nonsense glued together with hope.

Suggested first commit for cs453-project-template
For the first pass, I’d create:

cs453-project-template/
README.md
.gitignore
.env.example
docker-compose.yml
docs/
architecture.md
apps/
api/
README.md
client/
README.md
database/
README.md
scripts/
README.md
That gives you the shell without committing to framework details too early.

What to decide next
There are really only two architecture decisions left before we start filling in files:

1. Express or NestJS?
   My opinion:

Express if you want minimal magic and easier teaching of fundamentals

NestJS if you want stronger structure, DTOs, guards, and scalable organization

Given your own background, I suspect NestJS would feel natural to you. But for students new to databases and auth, Express may be the gentler on-ramp.

2. Plain HTML/JS client or React client?
   My opinion:

Plain HTML/JS if the course is about architecture more than frontend tooling

React if you want a more modern client and can tolerate the added framework load

For this course, I’d lean plain client first, maybe with a later option to upgrade. Otherwise the frontend build chain starts eating class time like a raccoon in a pantry.

My strong recommendation
For the initial template:

TypeScript

Node

Express

PostgreSQL in Docker

simple browser client

auth added in milestone 2

WebSockets and GraphQL as milestone 3 extensions

That keeps the course focused on client/server architecture, not framework theology.

The next thing we should do is draft the actual folder skeleton and README contents for cs453-project-template so you can paste it straight into GitHub and make the first real commit.


That works lets fill out the top readme

Excellent. A good README is like a well-drawn architectural blueprint: it tells people where the doors are before they start walking into walls. For a course template repo, the README has three jobs:

Explain the project concept

Explain the architecture

Explain how students run the system

Students should be able to clone the repo and understand what’s going on without hunting through lecture slides like archaeologists decoding a lost civilization.

Below is a clean Markdown README you can drop directly into cs453-project-template/README.md.

# CS453/553 Client-Server Architecture Project

This repository contains the **starter template** for the semester project in  
**CS453 / CS553 – Client/Server Architectures**.

Students will build and extend a distributed web application over the course
of the semester. The system will evolve through several architectural stages,
mirroring the historical evolution of modern web systems.

The goal of the project is to help students understand **how real client/server
systems are designed and built**, including:

- REST API design
- database integration
- authentication and authorization
- multi-service architectures
- real-time communication
- modern API technologies

---

# Project Overview

The semester project is a **Task / Project Management System**.

The application allows users to:

- create projects
- create tasks within projects
- assign tasks to users
- track task status
- comment on tasks
- view project activity

This domain is intentionally simple so that the focus remains on **system
architecture and communication between components**, rather than complex
business logic.

---

# Architecture Overview

The system follows a typical web architecture.

```mermaid
Browser Client
|
v
REST API
|
v
PostgreSQL
```


Over the semester, the architecture will evolve to include additional
components such as authentication services, real-time communication,
and potentially additional APIs.

Example extended architecture:

```mermaid
Browser Client
|
v
API Layer
/
Auth API Task API
|
v
PostgreSQL
```

---

# Technology Stack

The default project stack is:

Server
- Node.js
- TypeScript
- Express

Database
- PostgreSQL

Development Tools
- Docker (for database)
- npm
- Git

Students who prefer Python may implement the server using **FastAPI**, but
all examples and starter code will use **TypeScript**.

---

# Repository Structure

```shell
cs453-project-template
│
├── apps
│ ├── api
│ │ Server-side application
│ │
│ └── client
│ Simple browser client
│
├── database
│ Database schema, migrations, and seed data
│
├── docs
│ Architecture documentation
│
├── scripts
│ Utility scripts for development
│
├── docker-compose.yml
│ Starts PostgreSQL database
│
└── README.md
```

---

# Development Setup

## 1. Clone the repository

```shell
git clone <your-repository-url>
cd cs453-project-template
```

## 2. Start the database

This project uses Docker to run PostgreSQL locally.

```shell
docker-compose up -d
```

This will start a PostgreSQL database container.

---

## 3. Install dependencies

```shell
cd apps/api
npm install
```

---

## 4. Run the server
```shell
npm run dev
```


The API server should start locally.

---

# Project Milestones

The project will evolve over several milestones during the semester.

### Milestone 1 – REST API

Students will implement:

- REST endpoints
- database integration
- CRUD operations
- request validation

---

### Milestone 2 – Authentication

Students will add:

- user accounts
- password hashing
- login endpoints
- JWT authentication
- protected routes

---

### Milestone 3 – Architectural Extensions

Students will extend the system with at least one of the following:

- WebSockets for real-time updates
- GraphQL API
- multi-service architecture
- asynchronous messaging
- advanced API documentation

Graduate students will complete an additional architecture extension and
design analysis.

---

# Learning Goals

By completing this project students should understand:

- how client/server systems communicate
- how APIs are designed and implemented
- how databases integrate with web services
- how authentication works in distributed systems
- how modern web architectures evolve over time

---

# Academic Integrity

All work submitted for this project must be your own.

Students may use documentation and external references, but copying code
from other students or online repositories is considered academic misconduct.

---

# License

This repository is provided for educational use in CS453/553.****