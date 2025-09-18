# 📝 Complete Content Editing Guide

This guide shows you exactly where to modify content in your portfolio website.

## 🚀 Quick Access
- **Advanced Admin Panel**: `admin-advanced.html` (Use this for easy editing!)
- **Manual Editing**: Follow the file locations below

---

## 1. 👤 PERSONAL INFORMATION

### File: `index.html`

**Your Name** (Line 52)
```html
<h1 class="name" title="Thomas Tran">Thomas Tran</h1>
```

**Job Title** (Line 54)
```html
<p class="title">DevOps Engineer</p>
```

**Email** (Line 80)
```html
<a href="mailto:thomastran6832@gmail.com" class="contact-link">thomastran6832@gmail.com</a>
```

**Phone** (Line 94)
```html
<a href="tel:+84961407981" class="contact-link">+(84) 96140-7981</a>
```

**Birthday** (Line 108)
```html
<time datetime="1982-06-23">June 23, 1982</time>
```

**Location** (Line 122)
```html
<address>Ho Chi Minh City, Vietnam</address>
```

**Profile Avatar** (Line 48)
```html
<img src="./assets/images/my-avatar.png" alt="Thomas Tran" width="80">
```

---

## 2. 📖 ABOUT ME SECTION

### File: `index.html` (Lines 212-233)

**About Description**
```html
<p>
  I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media.
  I enjoy turning complex problems into simple, beautiful and intuitive designs.
</p>
<p>
  My job is to build your website so that it is functional and user-friendly but at the same time attractive.
  Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring
  across your message and identity in the most creative way. I created web design for many famous brand companies.
</p>
```

---

## 3. 🛠️ SERVICES/WHAT I DO

### File: `index.html` (Lines 240-310)

**Service 1 - CI/CD & Automation** (Lines 242-252)
```html
<div class="service-item">
  <div class="service-icon-box">
    <img src="./assets/images/icon-design.svg" alt="design icon" width="40">
  </div>
  <div class="service-content-box">
    <h4 class="h4 service-item-title">CI/CD & Automation</h4>
    <p class="service-item-text">
      Design and implement automated CI/CD pipelines using Jenkins, GitLab CI, and GitHub Actions.
    </p>
  </div>
</div>
```

**Service 2 - Cloud Infrastructure** (Lines 258-268)
**Service 3 - Containerization** (Lines 274-284)
**Service 4 - Monitoring** (Lines 290-300)

---

## 4. 🎯 SKILLS SECTION

### File: `index.html` (Lines 640-690)

**Skill Example**
```html
<li class="skills-item">
  <div class="title-wrapper">
    <h5 class="h5">Docker & Kubernetes</h5>
    <data value="90">90%</data>
  </div>
  <div class="skill-progress-bg">
    <div class="skill-progress-fill" style="width: 90%;"></div>
  </div>
</li>
```

**To Change Skills:**
1. Edit skill name: `<h5 class="h5">Your Skill Name</h5>`
2. Edit percentage: `<data value="85">85%</data>`
3. Edit progress bar: `style="width: 85%;"`

---

## 5. 🎓 RESUME - EDUCATION

### File: `index.html` (Lines 530-575)

**Education Item**
```html
<li class="timeline-item">
  <h4 class="h4 timeline-item-title">University school of the arts</h4>
  <span>2007 — 2008</span>
  <p class="timeline-text">
    Nemo enims ipsam voluptatem, blanditiis praesentium voluptum delenit atque corrupti.
  </p>
</li>
```

---

## 6. 💼 RESUME - WORK EXPERIENCE

### File: `index.html` (Lines 587-635)

**Experience Item**
```html
<li class="timeline-item">
  <h4 class="h4 timeline-item-title">Creative director</h4>
  <span>2015 — Present</span>
  <p class="timeline-text">
    Nemo enim ipsam voluptatem blanditiis praesentium voluptum delenit atque corrupti.
  </p>
</li>
```

---

## 7. 💼 PORTFOLIO PROJECTS

### File: `assets/js/project-data.js` (Lines 10-50)

**Project Structure**
```javascript
{
    "id": "project1",
    "title": "E-Commerce Website",
    "description": "A fully responsive e-commerce platform...",
    "image": "./assets/images/project-1.jpg",
    "technologies": ["React", "Node.js", "MongoDB"],
    "github": "https://github.com/yourusername/project1",
    "demo": "https://project1-demo.com",
    "category": "web development"
}
```

**OR Manual HTML** (Lines 773-930)
```html
<li class="project-item active" data-filter-item data-category="web development">
  <a href="#">
    <figure class="project-img">
      <div class="project-item-icon-box">
        <ion-icon name="eye-outline"></ion-icon>
      </div>
      <img src="./assets/images/project-1.jpg" alt="finance" loading="lazy">
    </figure>
    <h3 class="project-title">Finance</h3>
    <p class="project-category">Web development</p>
  </a>
</li>
```

---

## 8. 📝 BLOG POSTS

### File: `index.html` (Lines 1030-1180)

**Blog Post Structure**
```html
<li class="blog-post-item">
  <a href="#">
    <figure class="blog-banner-box">
      <img src="./assets/images/blog-1.jpg" alt="Design conferences in 2022" loading="lazy">
    </figure>
    <div class="blog-content">
      <div class="blog-meta">
        <p class="blog-category">Design</p>
        <span class="dot"></span>
        <time datetime="2022-02-23">Fab 23, 2022</time>
      </div>
      <h3 class="h3 blog-item-title">Design conferences in 2022</h3>
      <p class="blog-text">
        Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.
      </p>
    </div>
  </a>
</li>
```

---

## 9. 📞 CONTACT SECTION

### File: `index.html` (Lines 1212-1240)

**Contact Message** (Lines 1214-1216)
```html
<p>Ready to start your next project? Let's discuss how I can help you achieve your DevOps and infrastructure goals.</p>
```

**Form Action** (Line 1223)
```html
<form action="https://formspree.io/f/your-form-id" method="POST" class="form" data-form>
```

---

## 10. 🔗 SOCIAL MEDIA LINKS

### File: `index.html` (Lines 131-153)

**Social Links**
```html
<li class="social-item">
  <a href="#" class="social-link">
    <ion-icon name="logo-facebook"></ion-icon>
  </a>
</li>
```

---

## 11. 🖼️ IMAGES TO REPLACE

### Directory: `assets/images/`

**Replace these files with your own:**
- `my-avatar.png` - Your profile photo
- `project-1.jpg` to `project-9.png` - Your project screenshots
- `blog-1.jpg` to `blog-6.jpg` - Your blog post images
- `logo.ico` - Your site favicon

---

## 🎨 QUICK CUSTOMIZATION CHECKLIST

- [ ] Replace profile avatar (`my-avatar.png`)
- [ ] Update name and job title
- [ ] Change contact information
- [ ] Modify about me description
- [ ] Update skills and percentages
- [ ] Add your education history
- [ ] Add your work experience
- [ ] Replace portfolio projects
- [ ] Update blog posts
- [ ] Set up contact form email
- [ ] Add social media links
- [ ] Replace project images

---

## 🚀 PRO TIP

Use the **Advanced Admin Panel** (`admin-advanced.html`) for the easiest editing experience! It provides a user-friendly interface for all these changes.

**Access it at**: http://localhost:8080/admin-advanced.html