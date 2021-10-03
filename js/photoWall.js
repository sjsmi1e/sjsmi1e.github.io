var imgDataPath = "https://sjsmile.cn/photos.json"; //图片名称高宽信息json文件路径
var imgPath = "https://sjsmile.cn/"; //图片访问路径
var imgMaxNum = 50; //图片显示数量

var windowWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
if (windowWidth < 768) {
    var imageWidth = 145; //图片显示宽度(手机端)
} else {
    var imageWidth = 250; //图片显示宽度
}
let constData;
const photo = {
    page: 1,
    offset: imgMaxNum,
    init: function () {
        var that = this;
        $.getJSON(imgDataPath, function (data) {
            constData = data;
            that.render(that.page, data);
            //that.scroll(data);
            // that.eventListen(data);
            let $container = $('#masonry');
            $container.imagesLoaded(function () {
                $container.masonry({
                    itemSelector: '.photo-box',
                    gutter: 10,
                    isAnimated: true,
                });
            });
        });
    },
    constructHtml(options) {
        const {
            imageWidth,
            imageX,
            imageY,
            name,
            imgPath,
            imgName,
            imgNameWithPattern,
        } = options

        let imgHtml =
            `<div class="photo-box">
                <div style="width:${imageWidth}px;height:${(imageWidth * imageY) / imageX}px;">
                  <a data-fancybox="gallery" class="grouped_elements" rel="group1" href="${imgPath}${name}/${imgNameWithPattern}">
                    <img class="lazyload" data-src="${imgPath}${name}/${imgNameWithPattern}"  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                    onload="lzld(this)"
                    lazyload="auto"
                    >
                  </a>
                </div>
            </div>`
        return imgHtml;
    },
    render: function (page, data = []) {
        this.data = data;
        if (!data.length) return;
        var html,
            imgNameWithPattern,
            imgName,
            imageSize,
            imageX,
            imageY,
            li = "";

        let liHtml = "";
        let contentHtml = "";

        data.forEach((item, index) => {
            if (index === 0) {
                // active
                liHtml += `<li style="margin: 5px;">
                        <a href="javascript:;" photo-uuid="${item.name}" onclick="changePhoto('${item.name}')" class="layui-btn layui-btn-normal" style="color: white">${item.name}</a>
                       </li>`;
            } else {
                liHtml += `<li style="margin: 5px;">
                        <a href="javascript:;" photo-uuid="${item.name}" onclick="changePhoto('${item.name}')" class="layui-btn layui-btn-primary" style="color: black">${item.name}</a>
                       </li>`;
            }

        });
        const [initData = {}] = data;
        const {children = [], name} = initData;
        children.forEach((item, index) => {
            imgNameWithPattern = item.split(" ")[1];
            imgName = imgNameWithPattern.split(".")[0];
            imageSize = item.split(" ")[0];
            imageX = imageSize.split(".")[0];
            imageY = imageSize.split(".")[1];
            let imgOptions = {
                imageWidth,
                imageX,
                imageY,
                name,
                imgName,
                imgPath,
                imgNameWithPattern,
            };
            li += this.constructHtml(imgOptions);
        });
        const ulHtml = `<ul style="display:flex;flex-wrap:wrap;">${liHtml}</ul>`;

        $("#imageTab").append(ulHtml);
        $(".ImageGrid").append(li);
        // this.minigrid();
    },
    eventListen: function (data) {
        let self = this;
        var html,
            imgNameWithPattern,
            imgName,
            imageSize,
            imageX,
            imageY,
            li = "";
        $('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
            $(".ImageGrid").empty();
            const selectId = $(e.target).attr("photo-uuid");
            const selectedData = data.find((data) => data.name === selectId) || {};
            const {children, name} = selectedData;
            let li = "";
            children.forEach((item, index) => {
                imgNameWithPattern = item.split(" ")[1];
                imgName = imgNameWithPattern.split(".")[0];
                imageSize = item.split(" ")[0];
                imageX = imageSize.split(".")[0];
                imageY = imageSize.split(".")[1];
                let imgOptions = {
                    imageWidth,
                    imageX,
                    imageY,
                    name,
                    imgName,
                    imgPath,
                    imgNameWithPattern,
                };
                li += self.constructHtml(imgOptions);
            });
            $(".ImageGrid").append(li);
            // self.minigrid();
        });
    },
    minigrid: function () {
        var grid = new Minigrid({
            container: ".ImageGrid",
            item: ".card",
            gutter: 12,
        });
        grid.mount();
        $(window).resize(function () {
            grid.mount();
        });
    },
};

function changePhoto(photoName) {
    // 修改样式
    let $activeBtn = $(`a[photo-uuid=${photoName}]`);
    let $oriBtn = $('a.layui-btn-normal')
    $activeBtn.removeClass("layui-btn-primary");
    $activeBtn.addClass("layui-btn-normal");
    $activeBtn.css('color', 'white');
    $oriBtn.removeClass("layui-btn-normal");
    $oriBtn.addClass("layui-btn-primary");
    $oriBtn.css('color', 'black');


    $('#masonry').empty();
    const selectId = photoName;
    const selectedData = constData.find((data) => data.name === selectId) || {};
    const {children, name} = selectedData;
    let li = "";
    children.forEach((item, index) => {
        imgNameWithPattern = item.split(" ")[1];
        imgName = imgNameWithPattern.split(".")[0];
        imageSize = item.split(" ")[0];
        imageX = imageSize.split(".")[0];
        imageY = imageSize.split(".")[1];
        let imgOptions = {
            imageWidth,
            imageX,
            imageY,
            name,
            imgName,
            imgPath,
            imgNameWithPattern,
        };
        li += photo.constructHtml(imgOptions);
    });
    $('#masonry').append(li);
    $('#masonry').imagesLoaded(function () {
        $('#masonry').masonry('reload');
    })

}

$(function () {
    photo.init();
    $(window).resize(function () {
        $('#masonry').masonry('reload');
    });
})

