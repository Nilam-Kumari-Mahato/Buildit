export function getRiskLevel(score) {
    if (score >=75) return {label: "low risk" ,color: "#00c896"}
    if(score >=50) return {label: "medium risk" ,color: "#f5a623"}
    if(score >=25) return {label: "high risk" ,color: "#ff8c00"}
    return {label: "very high risk" ,color: "#ff4d4d"}

}