const scores = [
    {date: "2022/08/02", duration: "2:58"},
    {date: "2022/09/08", duration: "3:11"},
    {date: "2022/01/17", duration: "3:43"},
    {date: "2021/12/20", duration: "4:01"},
    {date: "2022/04/13", duration: "4:04"}
];

function buildScoreTable() {
    let scoreTable = document.getElementById("scoreTable");
    let head1 = document.createElement("b");
    head1.innerHTML = "Date";
    scoreTable.appendChild(head1);

    let head2 = document.createElement("b");
    head2.innerHTML = "Duration";
    scoreTable.appendChild(head2);

    for (let i = 0; i < scores.length; i++) {
        let date = document.createElement("p");
        let duration = document.createElement("p");

        date.innerHTML = scores[i].date;
        duration.innerHTML = scores[i].duration;
        scoreTable.appendChild(date);
        scoreTable.appendChild(duration);
    }
}

window.onload = () => {
    buildScoreTable();
}