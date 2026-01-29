namespace Application.UseCases.Managers.GetManagersByOwner;

public class GetManagersByOwnerQuery
{
    public uint OwnerId { get; }

    public GetManagersByOwnerQuery(uint ownerId)
    {
        OwnerId = ownerId;
    }
}