---
layout: single
title: "Categories"
permalink: /blog/categories/
author_profile: true
---

<div class="blog-wrapper">

{% for category in site.categories %}
  <h3 id="{{ category[0] | slugify }}">{{ category[0] }} <small>({{ category[1].size }})</small></h3>
  <ul class="blog-archives">
    {% for post in category[1] %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%b %d, %Y" }})</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

</div>
