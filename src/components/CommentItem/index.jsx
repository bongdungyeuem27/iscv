import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import avatarMen from '@asset/avatar_men.png'

function CommentItem() {
  return (
    <div className={styles.container}>
      <img src={avatarMen} className={styles.commentIcon}></img>
      <div className={styles.commentText}>
        <div className={styles.showCommentWrapper}>
          <div className={styles.commentName}>Dang Minh Quan</div>
          <div className={styles.commentContent}>Lorem ipsum dolor sit amet, consectetur</div>
        </div>
        <div className={styles.commentTool}>
          <span className={styles.commentLike}>
            <i className={'fa-light fa-heart'}></i>
            <a>Like</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
