export default function copyText(text: string) {
    navigator.clipboard.writeText(text).then();
}
