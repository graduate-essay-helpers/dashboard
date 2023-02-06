export default function () {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">home</i>',
      htmlAfter: ""
    },
    {
      title: "Orders",
      htmlBefore: '<i class="material-icons">table_chart</i>',
      to: "/orders",
    },
    {
      title: "Blog Post",
      htmlBefore: '<i class="material-icons">vertical_split</i>',
      to: "/blog",
    },
    {
      title: "Manage Order/Task",
      htmlBefore: '<i class="material-icons">assignment</i>',
      to: "/manage-order",
    },
    {
      title: "Payments",
      htmlBefore: '<i class="material-icons">credit_card</i>',
      to: "/payments",
    },
    {
      title: "Send/Upload",
      htmlBefore: '<i class="material-icons">book</i>',
      to: "/upload-work",
    },
    // {
    //   title: "Notifications",
    //   htmlBefore: '<i class="material-icons">&#xE7F4;</i>',
    //   to: "/notifications",
    // },
    // {
    //   title: "Chat",
    //   htmlBefore: '<i class="material-icons">chat</i>',
    //   to: "/chat",
    // },
    // {
    //   title: "Reviews/Comments",
    //   htmlBefore: '<i class="material-icons">comment</i>',
    //   to: "/errors",
    // },
    {
      title: "My profile",
      htmlBefore: '<i class="material-icons">person</i>',
      to: "/user-profile",
    },
    {
      title: "Users",
      htmlBefore: '<i class="material-icons">group</i>',
      to: "/view-users",
    },
    {
      title: "Writers",
      htmlBefore: '<i class="material-icons">mode_edit</i>',
      to: "/writers",
    },
    {
      title: "Coupon",
      htmlBefore: '<i class="material-icons">price_change</i>',
      to: "/generate-coupon",
    },
    {
      title: "Settings",
      htmlBefore: '<i class="material-icons">settings</i>',
      to: "/settings",
    },
    // {
    //   title: "Forms & Components",
    //   htmlBefore: '<i class="material-icons">view_module</i>',
    //   to: "/components-overview",
    // },
    // {
    //   title: "add new posts",
    //   htmlBefore: '<i class="material-icons">note_add</i>',
    //   to: "/add-new-post",
    // },
    // {
    //   title: "Tables",
    //   htmlBefore: '<i class="material-icons">table_chart</i>',
    //   to: "/tables",
    // },
    // {
    //   title: "Blog Posts",
    //   htmlBefore: '<i class="material-icons">vertical_split</i>',
    //   to: "/blog-posts",
    // }
  ];
}
