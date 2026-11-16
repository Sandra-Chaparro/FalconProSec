---
# Copy this file, rename it (the file name becomes the URL slug, e.g.
# what-a-public-email-reveals.md -> /investigations/what-a-public-email-reveals),
# and fill in every field. Files starting with "_" are never published.
title: 'Investigation title'
description: 'One or two sentences summarising the investigation for cards, search results and social previews.'
question: 'The specific question this investigation answers?'
# investigation = original work (evidence across sources, analysis, testing)
# brief         = short analysis of a public case from published reporting
format: investigation
pubDate: 2026-01-01
# updatedDate: 2026-01-15
# topic: human-vulnerability | trust-identity | ai-decision-making | human-connections | human-safety
topic: human-vulnerability
# Also list it under Security & Privacy / Technology categories (optional), e.g.
# social-engineering, personal-privacy, security-awareness, online-exposure,
# artificial-intelligence, ai-security. Full list: SECTIONS in src/data/taxonomy.ts
categories: []
tags: ['example-tag']
# heroImage: ./images/my-image.jpg   # stored next to this file
# heroAlt: 'Describe the image for screen readers'
featured: false
draft: true # set to false when ready to publish
sources:
  - title: 'Title of the source document or page'
    url: 'https://example.org/source'
    publisher: 'Publisher or organisation'
    accessed: 2026-01-01
corrections: []
# corrections:
#   - date: 2026-02-01
#     note: 'Describe what was corrected and why.'
---

<!--
Not every heading is needed every time; leave out what does not apply. Keep
the human questions, though: who is affected, how, and what could reduce it.
Label interpretation and hypothesis as such. Do not present them as fact.
-->

## Why this question matters

The context a reader needs, and why the question is worth asking now.

## Who can be affected, and how

The people exposed to this problem, how it reaches them, and why some are more exposed than others.

## Evidence

What was examined and how. Link every factual claim to a source.

## Analysis

Look at the problem from each perspective it needs:

- **Technology:** what makes the problem possible.
- **Human behavior:** what people do, or are led to do, and why.
- **Assumptions exploited:** what trust, habit or vulnerability is being relied on.

Be explicit about what is confirmed, what is interpretation, and what is uncertain.

## Experiment

What was built, tested or simulated to see the problem in practice (a controlled environment, a prototype, a walkthrough). Leave this section out if there was no experiment.

## Insight

What was learned, including what was surprising.

## What could reduce the risk

What people, organisations or designers could realistically do, and the limits of each option.

## What remains unknown

The questions this investigation leaves open. These feed the research agenda and future investigations.
