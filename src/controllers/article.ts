import { ArticleProxy } from '../proxy'
import { validator } from '../common/validator'
import { BaseContext } from 'koa'

export default class ArticleController {

  public static async create (ctx: BaseContext) {
    try {
      let { title, content, tag } = ctx.request.body
      validator(ctx, { title, content, tag }, {
        title: [
          { rule: 'required', errorMsg: '请输入文章标题' }
        ],
        content: [
          { rule: 'required', errorMsg: '请输入文字内容' }
        ],
        tag: [
          { rule: 'required', errorMsg: '请输入文章标签' }
        ]
      })
      let article = await ArticleProxy.newAndSave({ title, content, tag })
      ctx.body = {
        success: true,
        data: {
          title: article.title,
          content: article.content,
          tag: article.tag,
          create_at_format: article.create_at_format
        },
        message: '保存文章成功'
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  }

  public static async getArticleById (ctx: BaseContext) {
    try {
      let { id } = ctx.params
      validator(ctx, { id }, {
        id: [
          { rule: 'required', errorMsg: '请输入正确的文章id' }
        ]
      })
      let article = await ArticleProxy.findById(id)
      ctx.body = {
        success: true,
        data: {
          article
        },
        message: '查找文章成功'
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  }

  public static async getArticles (ctx: BaseContext) {
    try {
      // todo nomarlize page pagesize
      let { tag, page, pageSize } = ctx.query
      // validator({ tag } , { tag: ArticleFieldRule.tag })
      // validator({ page, pageSize }, { page: defaultRule.page, pageSize: defaultRule.pageSize })
      let articles = await ArticleProxy.find({ tag, page, pageSize })
      ctx.body = {
        success: true,
        data: {
          articles
        },
        message: '查找文章成功'
      }
    } catch (err) {
      ctx.throw(500, err)
    }
  }

}