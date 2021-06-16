/**
 * 清除高亮样式
 * @param text 高亮文本
 * @returns 返回清除<class=''> 后的文本
 */
function clearHightlight(text: string): string {
    const regx = /<[^>]*>|<\/[^>]*>/gm
    return text.replace(regx, '')
}

export { clearHightlight }
