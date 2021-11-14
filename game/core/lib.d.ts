declare type lib_type = {
    config: lib_config;
    db?: IDBDatabase;
    status: {
        running: boolean,
        canvas: boolean,
        time: number,
        reload: number,
        delayed: number,
        frameId: number,
        videoId: number,
        globalId: number
    },
    ondb: [string, any[]][],
    ondb2: [string, any[]][],
    configprefix: string,
    [prop: string]: any
};