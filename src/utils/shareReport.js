export async function sharereport(title, id){
    const url = `${window.location.origin}/results/${id}`

    if(navigator.share){
        try {
            await navigator.share({
                title: `Buildit Report =${title}`,
                text: `check out the AI validatiom report for "${title}" on Buildit`,
                url : url
            })
        }catch (err) {
            console.log('share Cancelled' , err)
        }
    }else{
        await navigator.clipboard.writeText(url)
        return url
    }
}