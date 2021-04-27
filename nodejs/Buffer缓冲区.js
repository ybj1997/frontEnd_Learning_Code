        /*
        1.Buffer.alloc（x）创建一个容量为x的连续存储空间
        */
        var buf = Buffer.alloc(10);
        buf[0] = 255;//输出16进制
        buf[1] = 0xff;
        //buffer对象为十六进制数据
        console.log(buf);
        //控制台输出默认十进制,可以利用toString（进制）方法改变进制
        //toString（）可以将Buffer字符串转化为正常字符串
        console.log(buf[0]);

        /*
        2.BUffer.from(str)将一个字符串转换为buffer（十六进制）
        */

        /*
        
        */