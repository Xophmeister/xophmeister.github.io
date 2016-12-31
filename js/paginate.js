// Pagination
// Copyright (c) 2016 Christopher Harrison
// MIT License
(function(root) {
  var dom = root.document,
      exportName = 'paginate';

  var formatDate = function(date) {
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
        domonth = date.getDate(),
        ordinal = ['th', 'st', 'nd', 'rd'][domonth % 10 < 4 ? (domonth % 10) * (parseInt(domonth / 10, 10) % 10 == 1 ? 0 : 1) : 0],
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];

    return day + ', ' + domonth + ordinal + ' ' + month + ' ' + date.getFullYear();
  };

  var Post = function(post) {
    var that = this;

    this.title = post.title;
    this.date = new Date(post.date);
    this.url = post.url;
    this.description = post.description;

    // Precalculate DOM node because our state never
    // changes and we need to use this multiple times
    this.domNode = (function() {
      var node = dom.createElement('li');
      node.innerHTML = '<h2><a class="post-title" href="' + that.url + '">' + that.title + '</a></h2>'
                     + '<p class="post-meta">' + formatDate(that.date) + '</p>'
                     + '<p class="post-description">' + that.description + '</p>';
      return node;
    })();
  };

  var deserialise = function(post) {
    return new Post(post);
  };

  var byDateThenTitle = function(postA, postB) {
    // Sort post by date (reverse chronological) then title
    return postB.date - postA.date
        || postB.title > postA.title ? -1 : 1;
  };

  var paginate = function(posts, perPage) {
    var postList = dom.getElementById('post-list'),
        canon = posts.map(deserialise).sort(byDateThenTitle);

    canon.forEach(function(post) {
      postList.appendChild(post.domNode);
    });
  };

  // Export function
  if (root.hasOwnProperty(exportName)) {
    throw new Error('Cannot export pagination function into root namespace')
  }
  root[exportName] = paginate;
})(window);
