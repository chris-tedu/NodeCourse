## 本地操作

1. git init  初始化一个本地仓库。会在文件夹里新建一个.git隐藏文件

2. git status  查看状态

3. git add <filenmae>  把一个文件从工作区添加到暂存区

4. git commit -m <comment>  把暂存区的文件添加到本地仓库 

5. git log 查看提交的详细的历史记录；但是有可能不全

6. git reflog  查看简要的历史记录;完整的记录

7. git diff 查看修改的内容。  - 代表删除的代码  +  代表新增的代码

8. git commit -am <comment> 直接把git add . 和git commit -m 合成了一步

9. git show <commit_id> 显示指定commit_id的修改

10. git reset --hard <commit_id> 回退到指定的版本。

11. git branch  显示当前所有的分支。会存在一个默认分支master

12. git branch <branch_name> 新建一个分支

13. git checkout <branch_name>  切换到指定的分支

14. git merge <branch_name>  把指定分支的代码合并到当前分支。先尝试自动解决冲突

    + git add . 把解决完冲突的代码提交到暂存区
    + git commit -m <comment> 提交到本地仓库

15. git rebase <branch_name> 需要完全手动的解决冲突

    + git add . 把解决完冲突的代码提交到暂存区
    + git rebase --continue 直接就把代码提交到了本地仓库
    + git rebase --abort 可以取消分支的合并

16. git branch -d/D <branch_name> 删除/强制删除 指定分支

17. git config 命令的使用。设置配置项，用来指定用户名和邮箱

    + git config --global 用来设置全局的用户名和邮箱。本质其实就是把配置项写入到一个文件里，这个文件的目录默认是  ~/.gitconfig
      + git config --global user.email <email>  配置用户的邮箱
      + git config --global user.name <name> 配置用户名
    + git config  如果不添加 --global参数，用来指定当前项目的用户名和邮箱。它默认保存在当前项目/.git/config 文件里


## 服务器操作

1. git clone <uri>  使用远端地址，克隆远端服务的工程。只执行一次
2. git push <origin master>   把本地的代码推送到远端服务器
3. git pull <origin master>:master 从服务器里拉取最新的代码。相当于 git fetch + git merge
4. git fetch 从服务器拿到最新的版本，并不会合并。需要调用git merge进行手动合并。

