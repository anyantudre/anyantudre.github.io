---
layout: single
title: "Archives"
permalink: /blog/archives/
author_profile: true
---

<div class="blog-wrapper blog-archives">

{% assign postsByYear = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}

{% for year in postsByYear %}
  <h3 id="{{ year.name }}">{{ year.name }}</h3>
  <ul>
    {% for post in year.items %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%b %d" }})</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

</div>
