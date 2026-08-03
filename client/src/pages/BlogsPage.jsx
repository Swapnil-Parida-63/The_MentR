import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FadeUp } from '../hooks/useScrollReveal';
import { Clock, Calendar, User, ArrowLeft, ArrowUpRight } from 'lucide-react';

// ==============================================================
// 1. COVER ILLUSTRATIONS (Minimalist Vector Art)
// ==============================================================
const CoverIllustration = ({ type }) => {
  switch (type) {
    case 'parents':
      return (
        <svg viewBox="0 0 400 220" className="cover-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#parents-grad)" />
          <circle cx="200" cy="110" r="85" fill="rgba(244, 63, 94, 0.02)" />
          <circle cx="160" cy="120" r="45" fill="rgba(244, 63, 94, 0.04)" />
          <circle cx="240" cy="100" r="55" fill="rgba(99, 102, 241, 0.04)" />
          <path d="M120 150 Q160 80 200 120 T280 90" stroke="rgba(244, 63, 94, 0.2)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M140 140 Q180 90 220 130 T260 100" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M220 60 L222 63 L225 64 L222 65 L220 68 L218 65 L215 64 L218 63 Z" fill="#F43F5E" opacity="0.6" />
          <path d="M170 160 L171.5 163 L174 164 L171.5 165 L170 168 L168.5 165 L166 164 L168.5 163 Z" fill="#6366F1" opacity="0.5" />
          <defs>
            <linearGradient id="parents-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF5F5" />
              <stop offset="100%" stopColor="#FFF0F5" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'teachers':
      return (
        <svg viewBox="0 0 400 220" className="cover-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#teachers-grad)" />
          <g opacity="0.12">
            <line x1="40" y1="40" x2="360" y2="40" stroke="#059669" strokeWidth="1" />
            <line x1="40" y1="70" x2="360" y2="70" stroke="#059669" strokeWidth="1" />
            <line x1="40" y1="100" x2="360" y2="100" stroke="#059669" strokeWidth="1" />
            <line x1="40" y1="130" x2="360" y2="130" stroke="#059669" strokeWidth="1" />
            <line x1="40" y1="160" x2="360" y2="160" stroke="#059669" strokeWidth="1" />
            <line x1="90" y1="20" x2="90" y2="200" stroke="#EF4444" strokeWidth="1" />
          </g>
          <rect x="130" y="70" width="140" height="90" rx="6" fill="#FFFFFF" stroke="rgba(5, 150, 105, 0.15)" strokeWidth="1.5" />
          <line x1="150" y1="95" x2="250" y2="95" stroke="rgba(5, 150, 105, 0.2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="110" x2="230" y2="110" stroke="rgba(5, 150, 105, 0.2)" strokeWidth="2" strokeLinecap="round" />
          <line x1="150" y1="125" x2="210" y2="125" stroke="rgba(5, 150, 105, 0.2)" strokeWidth="2" strokeLinecap="round" />
          <path d="M280 50 L295 65 L185 175 L170 160 Z" fill="rgba(5, 150, 105, 0.08)" />
          <path d="M280 50 L295 65" stroke="#059669" strokeWidth="1.5" />
          <defs>
            <linearGradient id="teachers-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="100%" stopColor="#DCFCE7" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'olympiad':
      return (
        <svg viewBox="0 0 400 220" className="cover-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#olympiad-grad)" />
          <g opacity="0.1">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="220" stroke="#0284C7" strokeWidth="0.75" />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#0284C7" strokeWidth="0.75" />
            ))}
          </g>
          <path d="M120 160 L200 60 L280 160 Z" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="195" y="150" width="10" height="10" fill="none" stroke="rgba(2, 132, 199, 0.3)" strokeWidth="1" />
          <circle cx="200" cy="110" r="45" stroke="rgba(2, 132, 199, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M80 70 Q100 80 120 70" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M280 70 Q300 80 320 70" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="olympiad-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0F9FF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'research':
      return (
        <svg viewBox="0 0 400 220" className="cover-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#research-grad)" />
          <path d="M60 160 Q 140 140 200 90 T 340 50" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60 160 Q 140 140 200 90 T 340 50" stroke="rgba(99, 102, 241, 0.15)" strokeWidth="8" strokeLinecap="round" />
          <circle cx="60" cy="160" r="5" fill="#6366F1" />
          <circle cx="130" cy="143" r="5" fill="#6366F1" />
          <circle cx="200" cy="90" r="6" fill="#4F7CFF" />
          <circle cx="270" cy="72" r="5" fill="#6366F1" />
          <circle cx="340" cy="50" r="7" fill="#7469F8" />
          <rect x="90" y="100" width="16" height="80" rx="3" fill="rgba(99, 102, 241, 0.05)" />
          <rect x="170" y="70" width="16" height="110" rx="3" fill="rgba(99, 102, 241, 0.05)" />
          <rect x="250" y="50" width="16" height="130" rx="3" fill="rgba(99, 102, 241, 0.05)" />
          <defs>
            <linearGradient id="research-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF2FF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>
          </defs>
        </svg>
      );
    case 'assessment':
    default:
      return (
        <svg viewBox="0 0 400 220" className="cover-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="url(#assessment-grad)" />
          <circle cx="200" cy="110" r="75" stroke="rgba(192, 38, 211, 0.06)" strokeWidth="1.5" />
          <circle cx="200" cy="110" r="50" stroke="rgba(192, 38, 211, 0.04)" strokeWidth="1" strokeDasharray="3 3" />
          <g transform="translate(140, 50)">
            <rect x="0" y="0" width="120" height="120" rx="8" fill="#FFFFFF" stroke="rgba(192, 38, 211, 0.15)" strokeWidth="1.5" />
            <rect x="40" y="-8" width="40" height="16" rx="4" fill="#F8FAFC" stroke="rgba(192, 38, 211, 0.2)" strokeWidth="1" />
            <line x1="20" y1="30" x2="100" y2="30" stroke="rgba(192, 38, 211, 0.15)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="25" cy="55" r="4" fill="#C026D3" />
            <line x1="40" y1="55" x2="90" y2="55" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="2" />
            <circle cx="25" cy="80" r="4" fill="#C026D3" />
            <line x1="40" y1="80" x2="100" y2="80" stroke="rgba(15, 23, 42, 0.1)" strokeWidth="2" />
          </g>
          <defs>
            <linearGradient id="assessment-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDF4FF" />
              <stop offset="100%" stopColor="#FAE8FF" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
};

// ==============================================================
// 2. MAIN BLOGS PAGE DATA SET
// ==============================================================
const articles = [
    {
      id: 1,
      tag: 'Research',
      tagClass: 'tag-research',
      title: "Why the teacher–student match matters more than the teacher's qualification",
      desc: "We analysed 3,200 parent feedback reports over 24 months. The strongest predictor of learning outcomes wasn't the tutor's postgraduate credentials, but the personal connection and rapport.",
      time: "8 min read",
      date: "June 2026",
      coverType: 'assessment',
      featured: true, // Hero element at the top
      content: `### Why the Teacher–Student Match Matters More Than the Teacher's Qualification

Category: Research  
Reading Time: 8 min  
Author: TheMentR Research Team  
Published: June 2026  

"A great teacher can fail with the wrong student. An average teacher can transform the right one."

When parents begin searching for a tutor, the first question is almost always: "How qualified is the teacher?"

It's understandable. Degrees, years of experience, certifications, board expertise—these feel measurable. They're easy to compare. But after studying thousands of tutoring relationships, we've found something surprising. The strongest predictor of a student's success isn't always the teacher's résumé. It's whether the teacher and student are the right match.

#### The problem with how tutoring usually works
Most tutoring platforms work like marketplaces. Parents scroll through dozens of teacher profiles comparing:
- Years of experience
- Ratings
- Subjects
- Fees
- Degrees

Eventually they pick one. Sometimes the decision is based on price, sometimes on availability, or simply because the teacher had five stars. Then they hope for the best.

The problem is that none of these factors tell you whether the teacher is actually the right person for your child. Teaching isn't only about delivering information. It's about communication, personality, motivation, learning style, pace, confidence, and trust. Those variables rarely appear on a profile page.

#### Imagine choosing a doctor this way
Imagine selecting a doctor only because they graduated from a prestigious university. No consultation. No diagnosis. No understanding of your symptoms. Just a list of qualifications. It sounds absurd. Yet this is exactly how many tutoring platforms expect parents to choose educators. Education deserves better.

#### Qualifications matter—but only to a point
This doesn't mean qualifications aren't important. They absolutely are. Every teacher should have strong subject knowledge. They should understand the curriculum. They should know how examinations work. They should be experienced enough to guide students correctly. Those are minimum requirements. Not differentiators.

Once those standards are met, something much more important begins to matter: **The relationship**.

#### Every child learns differently
Think about two students:
- **Student A**: Curious, loves asking questions, learns visually, enjoys discussions.
- **Student B**: Quiet, prefers structure, learns through repetition, needs encouragement before speaking.

Now imagine assigning both students the exact same teacher. One student flourishes. The other slowly loses confidence. The teacher didn't change. The student didn't suddenly become less capable. The fit changed.

#### Learning is deeply personal
Parents often believe that if a child isn't improving, the teacher isn't good enough. Sometimes that's true. But often, it's simply a mismatch. We've seen students who struggled for months suddenly improve after changing nothing except the mentor guiding them. Same syllabus, same books, same study hours. Different connection. That's because education isn't just knowledge transfer; it's human interaction.

#### The invisible factors parents rarely see
When we evaluate successful learning relationships, we consistently notice patterns that don't appear on teacher profiles, including:
- Communication style & patience level
- Teaching pace & personality compatibility
- Ability to motivate & feedback style
- Parent communication, adaptability, and emotional intelligence
- Student confidence building

These are difficult to measure individually. Together, they determine whether learning feels exciting—or exhausting.

#### Why trial-and-error is expensive
Many families discover mismatches only after several weeks. By then they've already invested time, money, and emotional energy. The student has fallen behind, confidence drops, and parents begin another search. Education shouldn't rely on repeated guessing.

#### The assessment-first approach
At TheMentR, we believe matching should happen before teaching begins. Instead of asking, *\"Which teacher do you want?\"*, we ask, *\"Tell us about the learner.\"* We begin by understanding academic strengths, learning gaps, study habits, confidence levels, goals, preferred communication styles, and schedules. Only after understanding the student do we recommend a mentor.

#### Why we built AVSAR
One challenge quickly became obvious. Every assessment produced valuable information: patterns, learning behaviours, subject trends, and teacher performance. Instead of letting this information disappear, we built **AVSAR**, TheMentR's educational intelligence layer. It helps us continuously improve recommendations by learning from real educational outcomes, making every recommendation smarter over time.

#### Better matching creates better outcomes
When students are paired with mentors who genuinely complement their learning style, questions become easier to ask, mistakes become learning opportunities, and progress becomes measurable. That's the kind of education ecosystem we believe in. Education isn't a marketplace.

#### Key Takeaways
- Qualifications are essential, but they don't guarantee compatibility.
- Student–teacher matching has a significant impact on learning outcomes.
- Trial-and-error tutoring wastes time, money, and confidence.
- Assessment before recommendation leads to better long-term relationships.
- Every child deserves a mentor who fits not only academically, but personally.

***
**Continue Reading:**
- *The Diagnostic Home Assessment: What Parents Should Expect*
- *Inside AVSAR: How Data Intelligence Predicts Learning Gaps*
- *Building a Trusted Teaching Practice: Lessons from Top Educators*`
    },
    {
      id: 2,
      tag: 'Olympiad',
      tagClass: 'tag-olympiad',
      title: "How to prepare for IMO Stage 1 in 60 days: A structured guide",
      desc: "A week-by-week math playbook covering syllabus breakdown, high-weightage topics, mock test cycles, and error log tracking.",
      time: "5 min read",
      date: "May 2026",
      coverType: 'olympiad'
    },
    {
      id: 3,
      tag: 'Parents',
      tagClass: 'tag-parents',
      title: "The diagnostic home assessment: what parents should expect",
      desc: "Before matching a mentor, our learning experts conduct a 90-minute diagnostic session. Here is how we gauge cognitive speed, focus drift, and academic foundations.",
      time: "4 min read",
      date: "April 2026",
      coverType: 'assessment'
    },
    {
      id: 4,
      tag: 'Teachers',
      tagClass: 'tag-teachers',
      title: "Building a trusted teaching practice: lessons from top 1% mentors",
      desc: "Our highest-rated educators reveal the classroom routines, progress templates, and feedback loops they use to build long-term trust with students.",
      time: "6 min read",
      date: "March 2026",
      coverType: 'teachers'
    },
    {
      id: 5,
      tag: 'Study Tips',
      tagClass: 'tag-study-tips',
      title: "Cognitive science tricks to double student retention rate",
      desc: "Understanding active recall, spaced repetition spacing schedules, and Cornell note-taking methods based on recent memory research.",
      time: "7 min read",
      date: "February 2026",
      coverType: 'research'
    },
    {
      id: 6,
      tag: 'Success Stories',
      tagClass: 'tag-success-stories',
      title: "From borderline passing to CBSE board topper: A MentR case study",
      desc: "How a structured match with a math-physics mentor transformed a student's performance from 45% to a perfect 98% score.",
      time: "9 min read",
      date: "January 2026",
      coverType: 'parents',
      wide: true // Wide spanning item to break grid rhythm
    },
    {
      id: 7,
      tag: 'Research',
      tagClass: 'tag-research',
      title: "Inside AVSAR: How data intelligence predicts educational gaps",
      desc: "Analyzing regional selection rates, teacher satisfaction index, and curriculum progression velocities across 18 Indian cities.",
      time: "10 min read",
      date: "December 2025",
      coverType: 'research'
    },
    {
      id: 8,
      tag: 'Parents',
      tagClass: 'tag-parents',
      title: "How do I hire the right home tutor in Bhubaneswar?",
      desc: "Learn how to hire the right home tutor in Bhubaneswar. Find verified subject experts, personalised learning, and structured mentorship with The MentR.",
      time: "6 min read",
      date: "August 2026",
      coverType: 'parents',
      content: `### How Do I Hire the Right Home Tutor in Bhubaneswar?

As a parent in Bhubaneswar, you may have considered providing additional educational support to your child. It can be achieved through personalised home learning in Bhubaneswar. There are a huge number of options for tutoring out there, making it easy to find a tutor, but not so easy to find the right home tutor in Bhubaneswar. Selecting an incorrect option could cause students to become frustrated, lose time and achieve inadequately.

The MentR streamlines the entire process with structured mentorship and progressive data-based tracking. We have helped thousands of students across India, and one problem comes up again and again: it's not that the student cannot do it.

Having a good tutor does more than just improve marks. It often transforms the way a student learns altogether.

#### Table of Contents
- How do I choose the right home tutor in Bhubaneswar for my child?
- Where can I find subject-wise home tutors in Bhubaneswar near my location?
- What are the benefits of hiring a private home tutor in Bhubaneswar?
- How quickly can I find and book a home tutor nearby in Bhubaneswar?

### How do I choose the right home tutor in Bhubaneswar for my child?

To choose the verified private tutors in Bhubaneswar, you need a key evaluation of the subject expertise of the respective tutor. Further, you need to analyse whether the tutor can keep your child engaged and has experience with your child’s particular board. Selecting a tutor should follow a structured framework rather than relying solely on word-of-mouth recommendations.

#### Identification of Academic Gaps
Identify if your child requires support in relevant subjects such as Mathematics, Science, English, Commerce or exam preparation. The challenge in learning should determine the tutor.

#### Match student to tutor
Board familiarity matters. Provide the tutor with experience in teaching students from CBSE, ICSE, BSE, or CHSE boards and who is well acquainted with their respective examination patterns.

#### Evaluate Teaching Methodology
A good tutor conveys information and assesses comprehension, adjusting instruction as necessary. Avoid tutors who simply assign work without ensuring comprehension.

#### Requesting A Demo Session
Watch the way they communicate, their knowledge of the subject and student involvement before committing.

#### Setting 30-Day Goals
Set up measurable goals, such as finishing the syllabus, learning the chapters, or getting closer to the objectives on tests. A good tutor will welcome this kind of structured planning.

Thus, to answer the question of how to hire the best home tutor in Bhubaneswar for CBSE and ICSE students, all mentors undergo a strict verification process, including reviews of their skills, teaching evaluations and compatibility tests, before being paired with a student at The MentR.

### Where can I find subject-wise home tutors in Bhubaneswar near my location?

Selecting a tutor requires subject-matter expertise, in which both the subject matter and what to look for are taken into consideration. Here are the factors that are listed below:
- Mathematics - Focus on conceptual clarity, mock tests, and transparent progress tracking
- Science - Look for practical explanations and strong board exam preparation
- Commerce - Prioritise problem-solving skills and real-world applications
- Competitive Exams - Emphasis on syllabus planning and time management

The MentR's location-based matching system pairs students with tutors based on expertise, board familiarity and geographical areas. For instance, a Class 11 Student in Physics from Patia is paired with the most appropriate Mentor in that vicinity.

### What are the benefits of hiring a private home tutor in Bhubaneswar?

Private tuition is an excellent alternative to classroom tutoring, which is very effective in tackling problems unique to a student, through how a verified private home tutor in Bhubaneswar can make a difference through personalised one-to-one learning:

tr - td(Student Issue) td(Ways in which Private Tuition Helps)
tr - td(Hesitation to ask questions) td(One-to-one learning ecology)
tr - td(Falling behind in the chapters) td(Identifying the targeted gap)
tr - td(Inconsistent scores) td(Structured set of assessments and revision)
tr - td(Weak writing skills in the exam) td(Techniques which are specific to a particular board)

In the MentR environment, we focus on routine, consistent learning through development plans, milestone tracking and tailored mentorship, which is often evident in the measurable progress students make.

### How quickly can I find and book a home tutor nearby in Bhubaneswar?

You can actually find and even book a verified home tutor in Bhubaneswar within 1 or 2 days, which involves searching and connecting on day 1, then scheduling a free demo and finalising the tutor on day 2. Here is the step-by-step booking procedure:
- Submit a consultation request
- Complete a 20–30 minute student assessment
- Receive top tutor matches based on subject, board, and location
- Begin a guided 30-day learning programme

This step-by-step procedure will guide you to book a home tutor with ease.
In cases where a tutor-student match is not optimal, the MentR review and reassignment process is conducted to ensure continuity of learning.

### Summary

Not just qualifications are to be checked when hiring the right home tutor in Bhubaneswar. Verified mentors, structured pedagogy, customised roadmaps and data-driven tracking provide the support students need to succeed, with the MentR.

Contact us at +91-9668562631 to find out how life-changing mentorship can be with a structured approach. Parents need to assess the subject's knowledge and their familiarity with the board, teaching approach and measurable outcomes.

### FAQs

#### How to determine the qualification of Home tutors in Bhubaneswar?
Check subject expertise, experience with the board, teaching experience, and a history of student progress.

#### How often per week will my child be at the school?
The number of sessions many students need is two or weekly, up to four sessions per week, depending on the learning gaps and academic goals.

#### When will academic improvement occur?
Students start to make noticeable improvements in 6-8 weeks with a proper study schedule.`
    },
    {
      id: 9,
      tag: 'Parents',
      tagClass: 'tag-parents',
      title: "Is home tuition best for students in Bhubaneswar?",
      desc: "Discover how to choose the best home tuition in Bhubaneswar. Find verified CBSE tutors, personalised learning, and expert guidance with The MentR.",
      time: "5 min read",
      date: "August 2026",
      coverType: 'parents',
      content: `### Is Home Tuition the Best Choice for Students in Bhubaneswar?

Home tuition can be the best form of academic support when classroom learning is not enough. It has had a tangible impact on Bhubaneswar families who are budget-conscious and looking for personalised solutions, and has provided a fitting educational solution.

The current educational atmosphere is highly competitive, and students need more individual attention than traditional schools can offer. So parents have been searching for private home tuition services in Bhubaneswar with experienced tutors to provide focused academic care for their children.

#### Table of Contents
- How can I find the best home tutor in Bhubaneswar?
- How do I find experienced tutors near me in Bhubaneswar?
- Which is the best home tuition service in Bhubaneswar for CBSE students?
- Can I get a private home tutor in Bhubaneswar?

### How can I find the best home tutor in Bhubaneswar?

Choosing the right tutor isn't just about finding someone who knows their subject well. In that case, you can use tutoring platforms to filter candidates by browsing verified reviews, booking demo sessions or even by subject.

Being competitive in today's academic environment is crucial. In most classroom contexts, little time is usually left for any sort of individual clarification of questions, revision of concepts or adjustment of speed. A private home tuition addresses this gap.

When you are selecting the best home tutor in Bhubaneswar for CBSE students, here are the key factors to consider:
- Familiarity with the curriculum standards of CBSE, BSE, CHSE and ICSE
- A structured, goal-oriented teaching approach
- A track record of measurable student improvement
- Clear communication with parents on progress and challenges
- Strong subject expertise and relevant academic qualifications

Ask each tutor three questions before deciding:
- How do you assess the learning gaps within the first few sessions?
- How do you adapt when a student is not improvising?
- How do you track the progress month by month?

At The MentR, we consider not only qualifications when judging tutors but also how well they teach and communicate with their students.

### How do I find experienced tutors near me in Bhubaneswar?

For the selection of experienced private tutors in Bhubaneswar, individuals have to turn to specific tutors and listing websites in Bhubaneswar. Currently, parents mainly seek reassurance from verified tutoring platforms that provide quality assurance and clarity.

tr - td(Key Factor) td(Unverified Tutor) td(A Structured Platform)
tr - td(Teaching Plan) td(Relies on the tutor) td(Based on the curriculum)
tr - td(Progress Track) td(Inconsistent) td(Consistent and reported to parents)
tr - td(Tutor Verification) td(Limited) td(Assessed and thoroughly screened)
tr - td(Accountability) td(Variable) td(Much more organised)

The MentR uses a robust matching and induction framework to ensure that all students are matched with a tutor who can meet their board, subject and learning-level requirements.

### Which is the best home tuition service in Bhubaneswar for CBSE students?

Effective home tuition should be more than a mere look through the book material, particularly for CBSE students. A good CBSE home tutoring service in Bhubaneswar will provide the following:

For CBSE students, good home tutoring services Bhubaneswar should entail the following:
- Syllabus plan for CBSE based on the term-exam timetable
- A focus on the conceptual understanding over rote memorisation
- Regular Mock assessments and revision strategies
- Ongoing three-way communication between tutor, student and parent

The MentR's mentorship model is built on exactly this. Students are paired with tutors who align with the board syllabus, are trained in board-specific topics, and are guided through a structured series of learning milestones throughout the academic year.

### Can I get a private home tutor in Bhubaneswar?

Yes. It is easy to find a home tutor verified with a professional tutoring website in Bhubaneswar. Hiring a home tutor who is professionally verified on a reputable tutoring website is simple. It's about enabling the right service, not merely about being available; the emphasis is on results. It all makes a difference when you choose the right service that focuses not only on availability but also on results.

One-to-one tuition, where needed, has been shown to achieve outstanding outcomes for individuals. Students who go from bad to good have one thing in common: a consistent study plan, frequent tests and a tutor who adjusts to their learning pace.

All students at The MentR have an individual mentor with whom they have established an ongoing relationship throughout the year, who knows their particular academic background and situation intimately.

### Summary

Home Tuition Services are one of the most effective forms of learning assistance for learners in the Bhubaneswar region. Enhanced outcomes and more self-assured, independent learners come from personalised attention, flexible learning schedules, curriculum-aligned teaching and structured learning.

For those considering structured tutoring at home, start by identifying your child's learning barriers and exploring The MentR to connect with targeted tutors and find a tutoring program that aligns with your child's learning objectives. The first step in your child's learning journey is to book a consultation by emailing book@thementr.com. Families searching for a reliable mentorship service that offers expert, structured home tuition in Bhubaneswar are opting for MentR.

### FAQs

#### How many home tuition sessions per week are usually effective?
Generally, two to four sessions are recommended per week. Your child's grade, subject challenge and academic goals will determine the right number.

#### What is the difference between home tuition and online tutoring?
Home tuition offers face-to-face interaction and immediate in-person support. Online tutoring also offers access to more tutors and more flexible scheduling for children. Either format can be a good fit, depending on the student's needs.

#### How quickly do improvements happen with private tutoring?
The most dramatic change in student performance is probably achieved within a few weeks when the sessions are held regularly, the student is actively involved in learning, and instruction is well organised.`
    }
];

const categories = ['All', 'Parents', 'Teachers', 'Olympiad', 'Study Tips', 'Research', 'Success Stories'];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.articleId) {
      const art = articles.find(a => a.id === location.state.articleId);
      if (art) {
        setSelectedArticle(art);
      }
    }
  }, [location.state]);

  // Filter articles based on active chip
  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter(a => a.tag === activeCategory);

  // Divide articles: Hero Article is isolated ONLY when category is 'All' and we have articles
  const heroArticle = activeCategory === 'All' ? articles.find(a => a.featured) : null;
  const gridArticles = activeCategory === 'All' ? articles.filter(a => !a.featured) : filteredArticles;

  return (
    <div className="section subpage-wrapper" style={{ background: '#fafafc', minHeight: '100vh', paddingTop: '140px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background ambient glows */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.02) 0%, transparent 70%)',
        top: '10%',
        left: '-10%',
        pointerEvents: 'none',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79, 124, 255, 0.015) 0%, transparent 70%)',
        bottom: '10%',
        right: '-10%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {selectedArticle ? (
          <div>
            {/* Back to list button */}
            <div style={{ textAlign: 'left', marginBottom: 32 }}>
              <FadeUp>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="journal-back-btn"
                  style={{ cursor: 'pointer', background: '#FFFFFF', border: '1px solid rgba(15, 23, 42, 0.08)' }}
                >
                  <ArrowLeft size={14} className="back-arrow" /> Back to Journal
                </button>
              </FadeUp>
            </div>

            {/* Premium Article Layout */}
            <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'left' }}>
              <FadeUp>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
                  <span className={`card-tag ${selectedArticle.tagClass}`} style={{ fontSize: 12, padding: '6px 14px' }}>{selectedArticle.tag}</span>
                  <span style={{ fontSize: 13, color: '#64748B' }}>{selectedArticle.time}</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, marginBottom: 20, letterSpacing: '-0.02em' }}>
                  {selectedArticle.title}
                </h1>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid rgba(15,23,42,0.06)', borderBottom: '1px solid rgba(15,23,42,0.06)', padding: '16px 0', marginBottom: 40 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>✍️</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>TheMentR Research Team</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>{selectedArticle.date}</div>
                  </div>
                </div>

                <div 
                  className="article-body-markdown"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: '#334155',
                    lineHeight: 1.85,
                    letterSpacing: '-0.003em'
                  }}
                >
                  {selectedArticle.content ? (
                    selectedArticle.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.trim().startsWith('tr -')) {
                        const rows = paragraph.split('\n').map(rowStr => {
                          const cells = [];
                          const matches = rowStr.match(/td\(([^)]+)\)/g);
                          if (matches) {
                            matches.forEach(m => {
                              const content = m.substring(3, m.length - 1);
                              cells.push(content);
                            });
                          }
                          return cells;
                        }).filter(c => c.length > 0);

                        if (rows.length > 0) {
                          return (
                            <div key={pIdx} style={{ overflowX: 'auto', margin: '24px 0', border: '1.2px solid rgba(15, 23, 42, 0.08)', borderRadius: 16, background: '#FFFFFF', boxShadow: '0 4px 15px rgba(15, 23, 42, 0.01)' }}>
                              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, fontFamily: 'var(--font-sans)' }}>
                                <thead>
                                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid rgba(15, 23, 42, 0.08)' }}>
                                    {rows[0].map((headerText, hIdx) => (
                                      <th key={hIdx} style={{ padding: '14px 20px', fontWeight: 700, color: '#1E293B', textAlign: 'left' }}>{headerText}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {rows.slice(1).map((r, rIdx) => (
                                    <tr key={rIdx} style={{ borderBottom: rIdx < rows.length - 2 ? '1px solid rgba(15, 23, 42, 0.04)' : 'none' }}>
                                      {r.map((cellText, cIdx) => (
                                        <td key={cIdx} style={{ 
                                          padding: '14px 20px', 
                                          color: cIdx === 0 ? '#1E293B' : '#475569', 
                                          fontWeight: cIdx === 0 ? 600 : 400,
                                          lineHeight: 1.5 
                                        }}>{cellText}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );
                        }
                      }
                      if (paragraph.startsWith('### ')) {
                        return <h2 key={pIdx} style={{ fontFamily: 'var(--font-hero)', fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 36, marginBottom: 16 }}>{paragraph.replace('### ', '')}</h2>;
                      }
                      if (paragraph.startsWith('#### ')) {
                        return <h3 key={pIdx} style={{ fontFamily: 'var(--font-hero)', fontSize: 20, fontWeight: 800, color: '#0F172A', marginTop: 28, marginBottom: 12 }}>{paragraph.replace('#### ', '')}</h3>;
                      }
                      if (paragraph.startsWith('- ')) {
                        return (
                          <ul key={pIdx} style={{ paddingLeft: 20, marginBottom: 20, listStyleType: 'disc' }}>
                            {paragraph.split('\n').map((li, liIdx) => (
                              <li key={liIdx} style={{ marginBottom: 8 }}>{li.replace('- ', '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      if (paragraph.startsWith('***')) {
                        return <hr key={pIdx} style={{ border: 'none', borderTop: '1px solid rgba(15,23,42,0.08)', margin: '40px 0' }} />;
                      }
                      return <p key={pIdx} style={{ marginBottom: 24 }}>{paragraph}</p>;
                    })
                  ) : (
                    <p>{selectedArticle.desc}</p>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        ) : (
          <div>
            {/* Navigation Breadcrumb */}
            <div style={{ textAlign: 'left' }}>
              <FadeUp>
                <Link to="/" className="journal-back-btn">
                  <ArrowLeft size={14} className="back-arrow" /> Back to Home
                </Link>
              </FadeUp>
            </div>

            {/* Page Header */}
            <div className="journal-page-header">
              <FadeUp delay={0.05}><div className="journal-page-eyebrow">THEMENTR JOURNAL</div></FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="journal-page-title">
                  Education, <span className="serif-italic">examined.</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="journal-page-subtitle">
                  Research, practical learning strategies and educational insights for parents, teachers and students.
                </p>
              </FadeUp>

              {/* Category Chips Filters */}
              <FadeUp delay={0.2}>
                <div className="category-chips-container">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* ============================================================== */}
            {/* HERO FEATURED STORY (All Category Only) */}
            {/* ============================================================== */}
            {heroArticle && (
              <FadeUp delay={0.25}>
                <div 
                  className="journal-hero-card" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedArticle(heroArticle)}
                >
              <div className="hero-cover-wrapper">
                <div className="noise-grain" />
                <div className="hero-glow" />
                <CoverIllustration type={heroArticle.coverType} />
              </div>
              <div className="hero-card-content">
                <span className={`card-tag ${heroArticle.tagClass}`}>{heroArticle.tag}</span>
                <h2 className="hero-card-title">{heroArticle.title}</h2>
                <p className="hero-card-desc">{heroArticle.desc}</p>
                <div className="card-divider" />
                <div className="card-metadata">
                  <span className="meta-item"><User size={13} /> By TheMentR Research</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-item"><Clock size={13} /> {heroArticle.time}</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-item"><Calendar size={13} /> {heroArticle.date}</span>
                </div>
              </div>
            </div>
          </FadeUp>
        )}

        {/* ============================================================== */}
        {/* ARTICLES DYNAMIC GRID */}
        {/* ============================================================== */}
        <div className="journal-grid">
          {gridArticles.map((art, idx) => {
            const isWide = activeCategory === 'All' && art.wide;
            return (
              <FadeUp key={art.id} delay={0.1 + (idx * 0.05)}>
                <div 
                  className={`journal-card ${isWide ? 'journal-card-wide' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedArticle(art)}
                >
                  <div className="cover-image-wrapper">
                    <div className="noise-grain" />
                    <CoverIllustration type={art.coverType} />
                  </div>
                  
                  <div className="card-body">
                    <div className="card-top">
                      <span className={`card-tag ${art.tagClass}`}>{art.tag}</span>
                      <ArrowUpRight size={16} className="card-arrow" />
                    </div>
                    
                    <h3 className="card-title">{art.title}</h3>
                    <p className="card-desc">{art.desc}</p>
                    
                    <div className="card-divider" />
                    
                    <div className="card-metadata">
                      <span className="meta-item"><Clock size={12} /> {art.time}</span>
                      <span className="meta-dot">•</span>
                      <span className="meta-item"><Calendar size={12} /> {art.date}</span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* EDITORIAL CTA SECTION */}
        {/* ============================================================== */}
        <FadeUp>
          <div className="journal-cta-section">
            <div style={{
              position: 'absolute',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79, 124, 255, 0.035) 0%, transparent 70%)',
              bottom: '-20%',
              right: '-10%',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            
            <div className="journal-cta-grid">
              
              {/* Subscribe Card */}
              <div className="journal-cta-card">
                <h3 className="cta-card-title">Subscribe to the Journal</h3>
                <p className="cta-card-desc">Get quarterly research studies, diagnostic frameworks and expert guides sent straight to your inbox.</p>
                <form className="cta-subscribe-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Enter your email" className="cta-input" required />
                  <button type="submit" className="cta-btn-submit">Subscribe</button>
                </form>
              </div>

              {/* Assessment Card */}
              <div className="journal-cta-card highlight-card">
                <h3 className="cta-card-title" style={{ color: '#FFFFFF' }}>Looking for the right mentor?</h3>
                <p className="cta-card-desc" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Begin with our diagnostic assessment visit. We map foundations, focus, and match the perfect certified educator.</p>
                <div style={{ marginTop: 24 }}>
                  <button 
                    onClick={() => {
                      localStorage.setItem('activeFormTab', 'assessment');
                      localStorage.setItem('highlightForm', 'true');
                      window.location.href = '/#contact-forms';
                    }} 
                    className="cta-btn-link"
                  >
                    Book Assessment Visit <span className="arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
      )}

      </div>

      {/* Magazine Stylesheet */}
      <style>{`
        /* Subpage Wrapper Adjustments */
        .subpage-wrapper {
          text-align: center;
        }

        /* Back Navigation */
        .journal-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: #FFFFFF;
          color: #475569;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          border-radius: 99px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.01);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          margin-bottom: 40px;
        }
        .journal-back-btn:hover {
          border-color: rgba(79, 124, 255, 0.25);
          background: #FFFFFF;
          color: #4F7CFF;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.05);
        }
        .journal-back-btn .back-arrow {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .journal-back-btn:hover .back-arrow {
          transform: translateX(-4px);
        }

        /* Page Header */
        .journal-page-header {
          text-align: left;
          max-width: 800px;
          margin-bottom: 56px;
        }
        .journal-page-eyebrow {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #6366F1;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .journal-page-title {
          font-family: var(--font-hero);
          font-size: clamp(38px, 5vw, 64px);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        .serif-italic {
          font-family: 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #4F7CFF;
          font-size: 1.08em;
        }
        .journal-page-subtitle {
          font-family: var(--font-sans);
          font-size: 17px;
          color: #64748B;
          line-height: 1.6;
          max-width: 650px;
        }

        /* Category Chips Filters */
        .category-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 36px;
          margin-bottom: 16px;
        }
        .category-chip {
          padding: 10px 20px;
          border-radius: 99px;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.06);
          color: #475569;
          user-select: none;
        }
        .category-chip:hover {
          border-color: rgba(79, 124, 255, 0.3);
          color: #4F7CFF;
        }
        .category-chip.active {
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%);
          border-color: transparent;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.15);
        }

        /* Hero Featured Card */
        .journal-hero-card {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 28px;
          box-shadow: 0 4px 24px rgba(15, 23, 42, 0.015);
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          margin-bottom: 56px;
        }
        .journal-hero-card:hover {
          border-color: rgba(99, 102, 241, 0.15);
          box-shadow: 0 12px 36px rgba(99, 102, 241, 0.03);
        }
        .hero-cover-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 280px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #EEF2FF;
        }
        .cover-svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .journal-hero-card:hover .cover-svg {
          transform: scale(1.03);
        }
        .noise-grain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.07;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          z-index: 1;
        }
        .hero-glow {
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
          filter: blur(25px);
          top: 15%;
          left: 20%;
          pointer-events: none;
          z-index: 0;
        }
        .hero-card-content {
          padding: 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .hero-card-title {
          font-family: var(--font-hero);
          font-size: clamp(22px, 2.5vw, 32px);
          font-weight: 800;
          color: #0F172A;
          line-height: 1.25;
          margin: 16px 0;
          letter-spacing: -0.01em;
        }
        .hero-card-desc {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Dinamic Grid system */
        .journal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }
        .journal-card-wide {
          grid-column: span 2;
        }
        
        /* Articles Cards styling */
        .journal-card {
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 24px;
          box-shadow: 0 4px 18px rgba(15, 23, 42, 0.012);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .journal-card:hover {
          transform: translateY(-6px);
          border-color: rgba(79, 124, 255, 0.4);
          box-shadow: 0 12px 28px rgba(79, 124, 255, 0.05);
        }
        
        .cover-image-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-bottom: 1px solid rgba(15, 23, 42, 0.03);
          background: #F8FAFC;
        }
        .journal-card:hover .cover-svg {
          transform: scale(1.04);
        }
        
        .card-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }
        .card-tag {
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.02em;
          width: fit-content;
        }
        .tag-research {
          background: #EEF2FF;
          color: #4F46E5;
        }
        .tag-olympiad {
          background: #ECFDF5;
          color: #059669;
        }
        .tag-parents {
          background: #F5F3FF;
          color: #7C3AED;
        }
        .tag-teachers {
          background: #EFF6FF;
          color: #2563EB;
        }
        .tag-study-tips {
          background: #FFFBEB;
          color: #D97706;
        }
        .tag-success-stories {
          background: #FFF1F2;
          color: #E11D48;
        }
        
        .card-arrow {
          color: #94A3B8;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .journal-card:hover .card-arrow {
          color: #4F7CFF;
          transform: translate(3px, -3px);
        }
        
        .card-title {
          font-family: var(--font-sans);
          font-size: 18px;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .card-desc {
          font-family: var(--font-sans);
          font-size: 14px;
          color: #64748B;
          line-height: 1.63;
          margin-bottom: 20px;
          flex-grow: 1;
        }
        
        .card-divider {
          height: 1px;
          background: rgba(15, 23, 42, 0.05);
          margin-bottom: 16px;
        }
        
        .card-metadata {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-sans);
          font-size: 13px;
          color: #94A3B8;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .meta-dot {
          color: #CBD5E1;
        }

        /* Dynamic Grid Layout modifiers for wide cards */
        .journal-card-wide .cover-image-wrapper {
          aspect-ratio: 2.3 / 1;
        }

        /* Editorial CTA Section */
        .journal-cta-section {
          position: relative;
          margin-top: 120px;
          padding: 80px 48px;
          background: #FFFFFF;
          border: 1px solid rgba(15, 23, 42, 0.05);
          border-radius: 32px;
          box-shadow: 0 4px 30px rgba(15, 23, 42, 0.015);
          overflow: hidden;
        }
        .journal-cta-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .journal-cta-card {
          text-align: left;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
        }
        .journal-cta-card.highlight-card {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          padding: 48px;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }
        .cta-card-title {
          font-family: var(--font-hero);
          font-size: 28px;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .cta-card-desc {
          font-family: var(--font-sans);
          font-size: 15px;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .cta-subscribe-form {
          display: flex;
          gap: 12px;
          width: 100%;
          max-width: 440px;
        }
        .cta-input {
          flex-grow: 1;
          padding: 12px 20px;
          border-radius: 99px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          transition: all 0.25s ease;
          background: #FAFAFC;
        }
        .cta-input:focus {
          border-color: #4F7CFF;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(79, 124, 255, 0.1);
        }
        .cta-btn-submit {
          padding: 12px 24px;
          background: linear-gradient(135deg, #4F7CFF 0%, #7469F8 100%);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(79, 124, 255, 0.15);
          transition: all 0.25s ease;
        }
        .cta-btn-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(79, 124, 255, 0.22);
        }
        .cta-btn-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #FFFFFF;
          color: #0F172A;
          font-family: var(--font-sans);
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 99px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: all 0.25s ease;
          width: fit-content;
        }
        .cta-btn-link:hover {
          transform: translateY(-2px);
          background: #F8FAFC;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
        }
        .cta-btn-link .arrow {
          transition: transform 0.2s ease;
        }
        .cta-btn-link:hover .arrow {
          transform: translateX(4px);
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 1024px) {
          .journal-hero-card {
            grid-template-columns: 1fr;
          }
          .hero-cover-wrapper {
            height: 240px;
          }
          .journal-card-wide {
            grid-column: span 1;
          }
          .journal-card-wide .cover-image-wrapper {
            aspect-ratio: 16 / 9;
          }
        }

        @media (max-width: 768px) {
          .category-chips-container {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 12px;
            margin-left: -16px;
            margin-right: -16px;
            padding-left: 16px;
            padding-right: 16px;
            scrollbar-width: none;
          }
          .category-chips-container::-webkit-scrollbar {
            display: none;
          }
          .category-chip {
            flex-shrink: 0;
          }
          
          .journal-hero-card {
            border-radius: 20px;
          }
          .hero-card-content {
            padding: 28px 24px;
          }
          
          .journal-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .journal-cta-section {
            padding: 40px 24px;
            border-radius: 24px;
            margin-top: 80px;
          }
          .journal-cta-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .journal-cta-card.highlight-card {
            padding: 32px 20px;
          }
          .cta-subscribe-form {
            flex-direction: column;
            gap: 10px;
          }
          .cta-btn-submit {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
