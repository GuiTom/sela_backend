
 #打包
npm run build
# 压缩
zip -r dist.zip dist
# 上传到服务器
scp ./dist.zip root@52.77.217.170:/opt/websites/sela_guild_backend/dist.zip
# 解压替换
ssh root@52.77.217.170 << EOF
cd /opt/websites/sela_guild_backend
rm -rf dist
unzip dist.zip
EOF
rm dist.zip

