import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/index.json'
import dashboardIndexEn from './en/page/dashboard/index.json'
import employeeCertificateEn from './en/page/dashboard/employeeCertificate.json'
import headerEn from './en/component/header/index.json'
import homeEn from './en/page/home/index.json'
import postItemEn from './en/component/postItem/index.json'
import morePanelEn from './en/component/morePanel/index.json'
import settingEn from './en/page/setting/index.json'
import settingPersonalEn from './en/page/setting/personal.json'
import postDashboardEn from './en/page/dashboard/posts.json'
import personalLayoutEn from './en/layout/personal/index.json'
import aboutPageEn from './en/page/about/index.json'
import toastEn from './en/component/toast/index.json'
import layoutSocialEn from './en/layout/social'
import iigPostsPageEn from './en/page/posts/left/iig.json'
import registerPageEn from './en/page/register/index.json'
import loginPageEn from './en/page/login/index.json'
import createPostDashboardPageEn from './en/page/dashboard/createPost.json'
import postPageEn from './en/page/post/index.json'
import feedPageEn from './en/page/feed/index.json'
import messagesPageEn from './en/page/messages/index.json'
import mycvPageEn from './en/page/mycv/index.json'
import scheduleDashboardPageEn from './en/page/dashboard/schedule.json'
import skillsPostPageEn from './en/page/posts/left/skills.json'
import languageCommentEn from './en/component/language/index.json'

import vi from './vi/index.json'
import dashboardIndexVi from './vi/page/dashboard/index.json'
import employeeCertificateVi from './vi/page/dashboard/employeeCertificate.json'
import headerVi from './vi/component/header/index.json'
import homeVi from './vi/page/home/index.json'
import postItemVi from './vi/component/postItem/index.json'
import morePanelVi from './vi/component/morePanel/index.json'
import settingVi from './vi/page/setting/index.json'
import settingPersonalVi from './vi/page/setting/personal.json'
import postDashboardVi from './vi/page/dashboard/posts.json'
import personalLayoutVi from './vi/layout/personal/index.json'
import aboutPageVi from './vi/page/about/index.json'
import toastVi from './vi/component/toast/index.json'
import layoutSocialVi from './vi/layout/social'
import iigPostsPageVi from './vi/page/posts/left/iig.json'
import registerPageVi from './vi/page/register/index.json'
import loginPageVi from './vi/page/login/index.json'
import createPostDashboardPageVi from './vi/page/dashboard/createPost.json'
import postPageVi from './vi/page/post/index.json'
import feedPageVi from './vi/page/feed/index.json'
import messagesPageVi from './vi/page/messages/index.json'
import mycvPageVi from './vi/page/mycv/index.json'
import scheduleDashboardPageVi from './vi/page/dashboard/schedule.json'
import skillsPostPageVi from './vi/page/posts/left/skills.json'
import languageCommentVi from './vi/component/language/index.json'

// the translations
const resources = {
  vi: {
    translation: vi,
    page: {
      home: {
        index: homeVi,
      },
      dashboard: {
        index: dashboardIndexVi,
        employeeCertificate: employeeCertificateVi,
        posts: postDashboardVi,
        createPost: createPostDashboardPageVi,
        schedule: scheduleDashboardPageVi,
      },
      setting: {
        index: settingVi,
        personal: settingPersonalVi,
      },
      about: {
        index: aboutPageVi,
      },
      posts: {
        left: {
          iig: iigPostsPageVi,
          skills: skillsPostPageVi,
        },
      },
      post: {
        index: postPageVi,
      },
      register: {
        index: registerPageVi,
      },
      login: {
        index: loginPageVi,
      },
      feed: {
        index: feedPageVi,
      },
      messages: {
        index: messagesPageVi,
      },
      mycv: {
        index: mycvPageVi,
      },
    },
    component: {
      header: {
        index: headerVi,
      },
      postItem: {
        index: postItemVi,
      },
      morePanel: {
        index: morePanelVi,
      },
      toast: {
        index: toastVi,
      },
      language: {
        index: languageCommentVi,
      },
    },
    layout: {
      social: {
        index: layoutSocialVi,
      },
      personal: {
        index: personalLayoutVi,
      },
    },
  },
  en: {
    translation: en,
    page: {
      home: {
        index: homeEn,
      },
      dashboard: {
        index: dashboardIndexEn,
        employeeCertificate: employeeCertificateEn,
        posts: postDashboardEn,
        createPost: createPostDashboardPageEn,
        schedule: scheduleDashboardPageEn,
      },
      setting: {
        index: settingEn,
        personal: settingPersonalEn,
      },
      about: {
        index: aboutPageEn,
      },
      posts: {
        left: {
          iig: iigPostsPageEn,
          skills: skillsPostPageEn,
        },
      },
      post: {
        index: postPageEn,
      },
      register: {
        index: registerPageEn,
      },
      login: {
        index: loginPageEn,
      },
      feed: {
        index: feedPageEn,
      },
      messages: {
        index: messagesPageEn,
      },
      mycv: {
        index: mycvPageEn,
      },
    },
    component: {
      header: {
        index: headerEn,
      },
      postItem: {
        index: postItemEn,
      },
      morePanel: {
        index: morePanelEn,
      },
      toast: {
        index: toastEn,
      },
      language: {
        index: languageCommentEn,
      },
    },
    layout: {
      social: {
        index: layoutSocialEn,
      },
      personal: {
        index: personalLayoutEn,
      },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  // fallbackLng: 'vi',
  lng: 'vi',
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  react: {
    useSuspense: false,
  },
})

export default i18n
