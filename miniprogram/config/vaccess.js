
/**
 * 封装访问权限
 *  
 */

function e(e) {
    return function(o) {
        var t = o && o.data && o.data.data && o.data.data[e];
        return void 0 === t && (t = 555), t;
    };
}

module.exports = {
    videolike: {
        method: "post",
        needlogin: !0
    },
    video_detail: {
        method: "post"
    },
    search: {
        method: "post",
        needlogin: !1
    },
    search_rank: {
        method: "post",
        needlogin: !1
    },
    search_smart: {
        method: "post",
        needlogin: !1
    },
    new_login: {
        method: "post"
    },
    auth_refresh: {
        method: "get",
        needlogin: !0,
        CSRF: !0,
        url: "https://accessv6.video.qq.com/user/auth_refresh?vappid=11059694&vsecret=fdf61a6be0aad57132bc5cdf78ac30145b6cd2c1470b0cfe"
    },
    detail_video_list: {
        method: "post",
        needlogin: !0,
        vversion_name: "7.3.0.0"
    },
    detail_cover_list: {
        method: "post"
    },
    detail_reco_module: {
        method: "post",
        needlogin: !0
    },
    circle_list: {
        method: "post",
        needlogin: !0
    },
    feed_info: {
        method: "get",
        needlogin: !0
    },
    circle_pub: {
        method: "post",
        needlogin: !0
    },
    circle_comment: {
        method: "post",
        needlogin: !0
    },
    circle_like: {
        method: "post",
        needlogin: !0
    },
    circle_del: {
        method: "post",
        needlogin: !0
    },
    circle_tipoff: {
        method: "post",
        needlogin: !0
    },
    channel_data: {
        method: "get",
        needlogin: !0,
        getBusicode: e("status")
    },
    sl_channel_data: {
        method: "post",
        needlogin: !0,
        getBusicode: e("status")
    },
    history_list: {
        method: "get",
        needlogin: !0
    },
    history_add: {
        method: "post",
        needlogin: !0
    },
    history_del: {
        method: "post",
        needlogin: !0
    },
    attent_list: {
        method: "post",
        needlogin: !0,
        CSRF: !0
    },
    attent_modify: {
        method: "post",
        needlogin: !0,
        CSRF: !0
    },
    vlist_index: {
        method: "post"
    },
    vlist_data: {
        method: "post"
    },
    label_sec: {
        method: "post",
        needlogin: !0,
        getBusicode: e("status")
    },
    user_profile: {
        method: "post",
        needlogin: !0
    },
    search_sec: {
        method: "post",
        needlogin: !1
    },
    star_home: {
        method: "get",
        needlogin: !1
    },
    feedback: {
        method: "get",
        needlogin: !0
    },
    hot_videoline: {
        method: "post",
        needlogin: !0,
        vversion_name: "5.8.0.123",
        getBusicode: e("errCode")
    },
    sec_videoline: {
        method: "get",
        needlogin: !0,
        getBusicode: e("errCode")
    },
    hot_video_insert: {
        method: "get",
        needlogin: !0,
        getBusicode: e("errCode")
    },
    vplus_list: {
        method: "get",
        needlogin: !1,
        getBusicode: e("errCode")
    },
    danmu: {
        method: "get"
    },
    hot_video_nav: {
        method: "get",
        getBusicode: e("errCode")
    },
    feedline_detail: {
        method: "get"
    },
    comm_before_live: {
        method: "get"
    },
    comm_of_chatroom: {
        method: "get"
    },
    comment_detail: {
        method: "get"
    },
    post_comment: {
        method: "post",
        needlogin: !0
    },
    live_detail: {
        method: "get"
    },
    live_poll: {
        method: "get",
        path: "fcgi"
    },
    set_user_follow: {
        method: "post",
        needlogin: !0,
        CSRF: !0,
        url: "https://accessv6.video.qq.com/user/ugc_userinfo_follow?raw=1&vappid=21403953&vsecret=58648bf6abcd2e6fe51f83ef47059ecdb3fd4d09c72b9d9c"
    },
    get_user_follow: {
        method: "post",
        needlogin: !0,
        CSRF: !0,
        url: "https://accessv6.video.qq.com/user/ugc_userinfo?raw=1&vappid=21403953&vsecret=58648bf6abcd2e6fe51f83ef47059ecdb3fd4d09c72b9d9c"
    },
    cp_relation: {
        method: "post",
        needlogin: !0,
        CSRF: !0,
        url: "https://access.video.qq.com/user/ugc_userinfo?raw=1&vappid=91056312&vsecret=0441ca5704084716d30d5df1fd8c39962d125bd221c7adc7"
    },
    cp_guanzhu: {
        method: "post",
        needlogin: !0,
        CSRF: !0,
        url: "https://access.video.qq.com/user/ugc_userinfo_follow?raw=1&vappid=91056312&vsecret=0441ca5704084716d30d5df1fd8c39962d125bd221c7adc7"
    }
};