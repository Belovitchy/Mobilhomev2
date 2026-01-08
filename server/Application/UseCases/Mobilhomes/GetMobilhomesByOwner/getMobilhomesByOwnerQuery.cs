namespace Application.UseCases.Mobilhomes.GetMobilhomesByOwner;

public class GetMobilhomesByOwnerQuery
{
    public uint OwnerId { get; }

    public GetMobilhomesByOwnerQuery(uint ownerId)
    {
        OwnerId = ownerId;
    }
}