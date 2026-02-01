---
layout: single
title: "Tags"
permalink: /blog/tags/
author_profile: true
---

<div class="blog-wrapper">

<div class="blog-tags-cloud">
{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  <a href="#{{ tag[0] | slugify }}" class="blog-post__tag">{{ tag[0] }} ({{ tag[1].size }})</a>
{% endfor %}
</div>

<hr style="margin: 2rem 0;">

{% for tag in sorted_tags %}
  <h3 id="{{ tag[0] | slugify }}">{{ tag[0] }} <small>({{ tag[1].size }})</small></h3>
  <ul class="blog-archives">
    {% for post in tag[1] %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%b %d, %Y" }})</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}

</div>
