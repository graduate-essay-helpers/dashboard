import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";

import { UserContext } from './context/UserContext';
// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import ViewUsers from "./views/ViewUsers";
import Orders from "./views/Orders";
import UploadWork from "./views/UploadWork";
import Notification from "./views/Notification";
import Writers from "./views/Writers";
import Payments from "./views/Payments";
import Settings from "./views/Settings";
import Assign from "./views/Assign";
import Coupon from "./views/Coupon";
import Chat from "./views/Chat";
import ManageTask from "./views/ManageTask";
import Test from "./Test";
import Blog from "./views/Blog";
import Editor from "./views/Editor";
import Add from "./views/editor/Add";
import Edit from "./views/editor/Edit";
import EditPost from "./views/editor/EditPost";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/editor",
    layout: DefaultLayout,
    component: Add
  },
  {
    path: "/edit/:postID",
    layout: DefaultLayout,
    component: Edit
  },
  // {
  //   path: "/editpost/:postID",
  //   layout: DefaultLayout,
  //   component: EditPost
  // },
  {
    path: "/payments",
    layout: DefaultLayout,
    component: Payments
  },
  {
    path: "/blog",
    layout: DefaultLayout,
    component: Blog
  },
  {
    path: "/chat",
    layout: DefaultLayout,
    component: Chat
  },
  {
    path: "/test",
    layout: DefaultLayout,
    component: Test
  },
  {
    path: "/manage-order",
    layout: DefaultLayout,
    component: ManageTask
  },
  {
    path: "/assign",
    layout: DefaultLayout,
    component: Assign
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/writers",
    layout: DefaultLayout,
    component: Writers
  },
  {
    path: "/notifications",
    layout: DefaultLayout,
    component: Notification
  },
  {
    path: "/view-users",
    layout: DefaultLayout,
    component: ViewUsers
  },
  {
    path: "/generate-coupon",
    layout: DefaultLayout,
    component: Coupon
  },
  {
    path: "/upload-work",
    layout: DefaultLayout,
    component: UploadWork
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    component: Orders
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  }
];
