let servers = [
    {id:'1', name:"F"},
    {id:'2', name:"S"},
    {id:'3', name:"1st"},
    {id:'4', name:"Rrr"},
    {id:'5', name:"G"},
    {id:'6', name:"B"},
]
export const getAll = (req, res)=> {
    res.status(200).json(servers)
}

export const create = (req, res) => {
    const newServer = {
        id: Date.now().toString(),
        ...req.body
    }
    servers.push(newServer)
    res.status(201).json(newServer)
}

export const remove = (req, res) => {
    console.log('id', req.params.id)
    servers = servers.filter(s=> s.id !== req.params.id)
    res.status(200).json(servers)
}